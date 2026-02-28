import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ExpenseService } from './expense.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import type { AuthUser } from 'src/auth/types/auth-user.type'

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() body: CreateExpenseDto, @CurrentUser() user: AuthUser) {
    return this.expenseService.create(body, user.id)
  }

  @Get(':tripId')
  findByTrip(@Param('tripId', ParseIntPipe) tripId: number, @CurrentUser() user: AuthUser) {
    return this.expenseService.findByTrip(tripId, user.id)
  }
}