import { Controller, Post, Get, Patch, Delete, Param, Req, Body, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from 'src/dto/Expense_Dto/createExpense.dto';
import { AuthGuard } from 'src/guards/authGuard/auth.guards';
import { UpdateExpenseDto } from 'src/dto/Expense_Dto/updateExpense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(AuthGuard)
  @Post("create-expense")
  createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req:any) {
    return this.expenseService.createExpense(createExpenseDto, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  updateExpense(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto, @Req() req:any) {
    return this.expenseService.updateExpense(id, updateExpenseDto, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  deleteExpense(@Param("id") id: string, @Req() req: any ) {
    return this.expenseService.deleteExpense(id, req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Get("expenses-list")
  fetchExpenses(@Req() req: any) {
    return this.expenseService.getExpenses(req.user.sub)
  }

  @UseGuards(AuthGuard)
  @Get("financial-statements")
  fetchFinStatements(@Req() req: any) {
    return this.expenseService.financialStatements(req.user.sub)
  }
}
