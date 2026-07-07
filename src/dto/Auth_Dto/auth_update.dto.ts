import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, MaxLength, MinLength, Matches } from "class-validator";

export class AuthUpdateDto {

  @IsOptional()
  @IsString()
  firstname: string

  @IsOptional()
  @IsString()
  lastname: string

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  @MinLength(8, {
    message: "Password must be at least 8 chars"
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  aim: string

  @IsOptional()
  @IsString()
  professions: string

  @IsOptional()
  @IsNumber()
  age: number

  @IsOptional()
  @IsBoolean()
  student: boolean

}