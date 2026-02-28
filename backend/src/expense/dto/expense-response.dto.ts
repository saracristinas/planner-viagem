import { Expense } from '@prisma/client';

export class ExpenseResponseDto {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;

  constructor(expense: Expense) {
    this.id = expense.id;
    this.description = expense.description;
    this.amount = expense.amount;
    this.category = expense.category;
    this.date = expense.date;
  }
}
