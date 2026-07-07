import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsDateString,
  IsIn,
  MaxLength,
} from "class-validator";

export class UpdateExpenseDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  expenseDate: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(
    [
      "COGS",
      "Operating_Expenses",
      "Fixed_Expenses",
      "Variable_Expenses",
      "Non_Operating_Expenses",
      "Other_Expenses",
    ],
    { each: true },
  )
  categories: string[];
}