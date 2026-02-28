import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { ExpenseResponseDto } from './dto/expense-response.dto'

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExpenseDto, userId: number) {
    // Validar que a trip pertence ao usuário
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: data.tripId,
        userId,
      },
    })

    if (!trip) {
      throw new NotFoundException('Viagem não encontrada')
    }

    const expense = await this.prisma.expense.create({
      data: {
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: new Date(data.date),
        tripId: data.tripId,
      },
    })

    return new ExpenseResponseDto(expense);
  }

  async findByTrip(tripId: number, userId: number) {
    // Validar que a trip pertence ao usuário
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
        userId,
      },
    })

    if (!trip) {
      throw new NotFoundException('Viagem não encontrada')
    }

    const expenses = await this.prisma.expense.findMany({
      where: { tripId },
    })

    return expenses.map(expense => new ExpenseResponseDto(expense));
  }
}