import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExpenseDto) {
    try {
      return await this.prisma.expense.create({
        data: {
          description: data.description,
          amount: data.amount,
          category: data.category,
          date: new Date(data.date),
          tripId: data.tripId,
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('Viagem não encontrada.')
      }

      throw error
    }
  }

  async findByTrip(tripId: number) {
    return this.prisma.expense.findMany({
      where: { tripId },
    })
  }
}