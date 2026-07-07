import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

import { Expense, ExpenseSchema } from 'src/Schema/expense.schema';
import { Revenue, RevenueSchema } from 'src/Schema/revenue.schema';

import { AuthGuard } from 'src/guards/authGuard/auth.guards';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Expense.name,
        schema: ExpenseSchema,
      },
      {
        name: Revenue.name,
        schema: RevenueSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, AuthGuard],
  exports: [ExpenseService],
})
export class ExpenseModule {}