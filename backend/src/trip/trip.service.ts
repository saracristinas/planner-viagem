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

  async findAll() {
    return this.prisma.trip.findMany({
      include: {
        expenses: true,
      },
    })
  }
}