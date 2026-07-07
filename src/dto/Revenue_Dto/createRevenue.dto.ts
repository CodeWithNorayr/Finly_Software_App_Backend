import {IsString, IsNotEmpty, IsOptional, IsArray, IsIn, ArrayNotEmpty, IsNumber, IsDateString, MaxLength} from "class-validator"

export class CreateRevenueDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsOptional()
  @IsDateString()
  revenueDate: string

  @IsArray()
  @IsString({each: true})
  @ArrayNotEmpty()
  @IsIn(
    [
      "Operating_Revenue", "Non-Operating_Revenue", "Financial_Revenue", "Other_Revenue"
    ],
    {each: true}
  )
  categories: string[]
}