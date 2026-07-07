import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Auth } from "./auth.schema";
import mongoose, { Types } from "mongoose";

@Schema({timestamps: true})
export class Revenue {

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  amount: number

  @Prop({
    type: [String],
    enum: ["Operating_Revenue", "Non-Operating_Revenue", "Financial_Revenue", "Other_Revenue"],
    required: true
  })
  categories: string[]

  @Prop({required: true, type: Date, default: Date.now })
  revenueDate: Date

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Auth.name, required: true})
  user: Types.ObjectId

}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);