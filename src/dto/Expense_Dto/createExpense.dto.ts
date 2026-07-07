import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsNotEmpty,
  IsDateString,
  ArrayNotEmpty,
  IsIn,
  MaxLength,
  Min
} from "class-validator";

export class CreateExpenseDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsDateString()
  expenseDate: string;

  @IsArray()
  @IsString({each:true})
  @ArrayNotEmpty()
  @IsIn(
    [
      "COGS",
      "Operating_Expenses",
      "Fixed_Expenses",
      "Variable_Expenses",
      "Non_Operating_Expenses",
      "Other_Expenses",
    ],
    {each:true}
  )
  categories: string[];
}