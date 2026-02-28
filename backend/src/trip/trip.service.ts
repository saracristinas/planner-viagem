import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTripDto } from './dto/create-trip.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTripDto) {
    try {
      return await this.prisma.trip.create({
        data: {
          title: data.title,
          destination: data.destination,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          budget: data.budget,
          userId: data.userId,
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('Usuário não encontrado.')
      }

      throw error
    }
  }

  async getResumo(tripId: number) {
  const trip = await this.prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      expenses: true,
      user: true,
      operations: true,
    },
  })

  if (!trip) {
    throw new Error('Viagem não encontrada')
  }

  const totalGasto = trip.expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  )

  const gastosPorCategoria = trip.expenses.reduce(
    (acc: Record<string, number>, expense) => {
      acc[expense.category] =
        (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {},
  )

  const budget = trip.budget ?? 0
  const fundoTrip = trip.emergencyFund
  const fundoGlobal = trip.user.emergencyFund

  const fundoTotalDisponivel = fundoTrip + fundoGlobal
  const limiteTotalPossivel = budget + fundoTotalDisponivel

  const saldoRestantePlanejado = budget - totalGasto
  const saldoRestanteTotal = limiteTotalPossivel - totalGasto

  const percentualUsado =
    budget > 0
      ? Number(((totalGasto / budget) * 100).toFixed(2))
      : 0

  const percentualUsoTotal =
    limiteTotalPossivel > 0
      ? Number(
          ((totalGasto / limiteTotalPossivel) * 100).toFixed(2),
        )
      : 0

  const ultrapassouOrcamento = totalGasto > budget

  const valorExcedente = ultrapassouOrcamento
    ? Number((totalGasto - budget).toFixed(2))
    : 0

  const aindaPodeCobrirComFundo =
    valorExcedente <= fundoTotalDisponivel

  let nivelAlerta: 'SEGURO' | 'ATENCAO' | 'CRITICO' = 'SEGURO'

  if (totalGasto > limiteTotalPossivel) {
    nivelAlerta = 'CRITICO'
  } else if (ultrapassouOrcamento) {
    nivelAlerta = 'ATENCAO'
  }

  let recomendacao = 'Orçamento sob controle.'

  if (totalGasto > limiteTotalPossivel) {
    recomendacao =
      'Você ultrapassou inclusive o fundo de emergência disponível.'
  } else if (ultrapassouOrcamento && aindaPodeCobrirComFundo) {
    recomendacao =
      'Você ultrapassou o orçamento planejado. Pode optar por usar fundo de emergência.'
  } else if (percentualUsado >= 80) {
    recomendacao =
      'Atenção: você já utilizou mais de 80% do orçamento.'
  }

  let statusFinanceiroFinal:
    | 'ESTAVEL'
    | 'USANDO_EMERGENCIA'
    | 'INSUSTENTAVEL' = 'ESTAVEL'

  if (totalGasto > limiteTotalPossivel) {
    statusFinanceiroFinal = 'INSUSTENTAVEL'
  } else if (ultrapassouOrcamento) {
    statusFinanceiroFinal = 'USANDO_EMERGENCIA'
  }

  const totalOperacoesEmergencia = trip.operations.length

  const totalUsadoEmergencia = trip.operations.reduce(
    (acc, op) => acc + op.totalAmount,
    0,
  )

  return {
    tripId: trip.id,
    title: trip.title,

    // Planejamento
    budget,
    percentualUsado,

    // Fundos
    fundoTrip,
    fundoGlobal,
    usedEmergencyFund: trip.usedEmergencyFund,
    fundoTotalDisponivel,

    // Totais
    totalGasto,
    limiteTotalPossivel,
    percentualUsoTotal,

    // Saldos
    saldoRestantePlanejado,
    saldoRestanteTotal,

    // Estado
    ultrapassouOrcamento,
    valorExcedente,
    aindaPodeCobrirComFundo,
    nivelAlerta,
    statusFinanceiroFinal,

    // Histórico
    totalOperacoesEmergencia,
    totalUsadoEmergencia,
    historicoEmergencia: trip.operations.map(op => ({
      id: op.id,
      amountTrip: op.amountTrip,
      amountGlobal: op.amountGlobal,
      totalAmount: op.totalAmount,
      createdAt: op.createdAt,
    })),

    gastosPorCategoria,
    recomendacao,
  }
}

async usarEmergencia(tripId: number) {
  return await this.prisma.$transaction(async (tx) => {
    const trip = await tx.trip.findUnique({
      where: { id: tripId },
      include: {
        expenses: true,
        user: true,
      },
    })

    if (!trip) {
      throw new Error('Viagem não encontrada')
    }

    const totalGasto = trip.expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0,
    )

    const budget = trip.budget ?? 0
    const excedente =
      totalGasto > budget ? totalGasto - budget : 0

    if (excedente <= 0) {
      return { message: 'Não há excedente para cobrir.' }
    }

    let restante = excedente
    let usadoTrip = 0
    let usadoGlobal = 0

    if (trip.emergencyFund > 0) {
      usadoTrip = Math.min(trip.emergencyFund, restante)
      restante -= usadoTrip
    }

    if (restante > 0 && trip.user.emergencyFund > 0) {
      usadoGlobal = Math.min(
        trip.user.emergencyFund,
        restante,
      )
      restante -= usadoGlobal
    }

    if (restante > 0) {
      return {
        message: 'Fundo insuficiente.',
        valorNaoCoberto: restante,
      }
    }

    // Atualiza Trip
    await tx.trip.update({
      where: { id: tripId },
      data: {
        emergencyFund: {
          decrement: usadoTrip,
        },
        usedEmergencyFund: {
          increment: usadoTrip,
        },
      },
    })

    // Atualiza User
    await tx.user.update({
      where: { id: trip.user.id },
      data: {
        emergencyFund: {
          decrement: usadoGlobal,
        },
      },
    })

    // Cria registro histórico
    await tx.financialOperation.create({
      data: {
        type: 'EMERGENCY_USAGE',
        tripId: trip.id,
        userId: trip.user.id,
        amountTrip: usadoTrip,
        amountGlobal: usadoGlobal,
        totalAmount: usadoTrip + usadoGlobal,
      },
    })

    return {
      message: 'Fundo utilizado com sucesso.',
      usadoDaTrip: usadoTrip,
      usadoDoGlobal: usadoGlobal,
    }
  })
}

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
      },
    })
  }
}