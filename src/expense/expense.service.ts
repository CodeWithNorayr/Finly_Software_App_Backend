import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Expense } from 'src/Schema/expense.schema';
import { CreateExpenseDto } from 'src/dto/Expense_Dto/createExpense.dto';
import { UpdateExpenseDto } from 'src/dto/Expense_Dto/updateExpense.dto';
import { isValidObjectId } from 'mongoose';
import { BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common/exceptions";
import { Revenue } from 'src/Schema/revenue.schema';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseSchema: Model<Expense>,
    @InjectModel(Revenue.name) private readonly revenueSchema: Model<Revenue>
  ) { }

  async createExpense(createExpenseDto: CreateExpenseDto, userId: string) {
    const expense = await this.expenseSchema.create({
      ...createExpenseDto,
      user: userId
    })

    return expense;
  }

  async getExpenses(userId: string) {
    const expenses = await this.expenseSchema.find({user: userId}).sort({ createdAt: -1 })
    return expenses
  }

  async updateExpense(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    userId: string,
  ) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }

    const expense = await this.expenseSchema.findById(id);

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.user.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this expense');
    }

    const updatedExpense = await this.expenseSchema.findByIdAndUpdate(
      id,
      updateExpenseDto,
      {
        new: true,
        runValidators: true,
      },
    );

    return updatedExpense;
  }

  async deleteExpense(id: string, userId: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id");

    const expense = await this.expenseSchema.findById(id);

    if (!expense) throw new NotFoundException("expense is not found");

    if (expense.user.toString() !== userId.toString()) throw new ForbiddenException("You are not allowed to delete this expense");

    const deletedExpense = await this.expenseSchema.findByIdAndDelete(id);

    return deletedExpense;
  }


    async financialStatements(userId: string) {
      const expenses = await this.expenseSchema.find({
        user: userId
      });
      const revenues = await this.revenueSchema.find({
        user: userId
      });
    
      const cogs = expenses
        .filter(e => e.categories.includes('COGS'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const operatingExpenses = expenses
        .filter(e => e.categories.includes('Operating_Expenses'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const fixedExpenses = expenses
        .filter(e => e.categories.includes('Fixed_Expenses'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const variableExpenses = expenses
        .filter(e => e.categories.includes('Variable_Expenses'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const nonOperatingExpenses = expenses
        .filter(e => e.categories.includes('Non_Operating_Expenses'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const otherExpenses = expenses
        .filter(e => e.categories.includes('Other_Expenses'))
        .reduce((sum, e) => sum + e.amount, 0);
    
      const operatingRevenue = revenues
        .filter(r => r.categories.includes('Operating_Revenue'))
        .reduce((sum, r) => sum + r.amount, 0);
    
      const nonOperatingRevenue = revenues
        .filter(r => r.categories.includes('Non_Operating_Revenue'))
        .reduce((sum, r) => sum + r.amount, 0);
    
      const financialRevenue = revenues
        .filter(r => r.categories.includes('Financial_Revenue'))
        .reduce((sum, r) => sum + r.amount, 0);
    
      const otherRevenue = revenues
        .filter(r => r.categories.includes('Other_Revenue'))
        .reduce((sum, r) => sum + r.amount, 0);
    
      const grossProfit = operatingRevenue - cogs;
    
      const operatingProfit = grossProfit - operatingExpenses;
    
      const totalRevenue =
        operatingRevenue +
        nonOperatingRevenue +
        financialRevenue +
        otherRevenue;
    
      const totalExpenses =
        cogs +
        operatingExpenses +
        fixedExpenses +
        variableExpenses +
        nonOperatingExpenses +
        otherExpenses;
    
      const profitBeforeTax = totalRevenue - totalExpenses;
    
      const taxRate = profitBeforeTax < 500000 ? 0.05 : 0.2;
    
      const tax = profitBeforeTax * taxRate;
    
      const netProfit = profitBeforeTax - tax;
    
      return {
        summary: {
          grossProfit,
          operatingProfit,
          profitBeforeTax,
          tax,
          netProfit,
        },
    
        revenue: {
          operatingRevenue,
          nonOperatingRevenue,
          financialRevenue,
          otherRevenue,
          totalRevenue,
        },
    
        expenses: {
          cogs,
          operatingExpenses,
          fixedExpenses,
          variableExpenses,
          nonOperatingExpenses,
          otherExpenses,
          totalExpenses,
        },
      };
    }
}
