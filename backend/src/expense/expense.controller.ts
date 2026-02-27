import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ExpenseService } from './expense.service'
import { CreateExpenseDto } from './dto/create-expense.dto'

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() body: CreateExpenseDto) {
    return this.expenseService.create(body)
  }

  @Get(':tripId')
  findByTrip(@Param('tripId', ParseIntPipe) tripId: number) {
    return this.expenseService.findByTrip(tripId)
  }
}