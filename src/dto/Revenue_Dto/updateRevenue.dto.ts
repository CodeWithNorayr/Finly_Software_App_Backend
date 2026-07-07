import {IsString, IsOptional, IsArray, IsIn, IsNumber, IsDateString} from "class-validator"

export class UpdateRevenueDto {
  
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  amount: number

  @IsOptional()
  @IsDateString()
  revenueDate: string

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  @IsIn(
    [
      "Operating_Revenue", "Non-Operating_Revenue", "Financial_Revenue", "Other_Revenue"
    ],
    {each: true}
  )
  categories: string[]
}