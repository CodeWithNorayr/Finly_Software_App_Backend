import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Auth } from "./auth.schema";

@Schema({timestamps: true})
export class Expense {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  amount: number

  @Prop({
    type: [String],
    enum: [
      "COGS",
      "Operating_Expenses",
      "Fixed_Expenses",
      "Variable_Expenses",
      "Non_Operating_Expenses",
      "Other_Expenses",
    ],
    required: true,
  })
  categories: string[];

  @Prop({required: true, type: Date, default: Date.now })
  expenseDate: Date

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Auth.name, required: true})
  user: Types.ObjectId

}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);