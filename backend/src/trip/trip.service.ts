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
    budget > 0 ? Number(((totalGasto / budget) * 100).toFixed(2)) : 0

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

  return {
    tripId: trip.id,
    title: trip.title,

    budget,
    fundoTrip,
    fundoGlobal,
    fundoTotalDisponivel,
    limiteTotalPossivel,

    totalGasto,
    saldoRestantePlanejado,
    saldoRestanteTotal,

    percentualUsado,
    ultrapassouOrcamento,
    valorExcedente,
    aindaPodeCobrirComFundo,

    nivelAlerta,
    gastosPorCategoria,
    recomendacao,
  }
}

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
      },
    })
  }
}