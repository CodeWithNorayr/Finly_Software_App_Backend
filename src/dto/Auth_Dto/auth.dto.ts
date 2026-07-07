import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, IsBoolean, MaxLength, MinLength, Matches } from "class-validator";

export class AuthRegistrationDto {

  @IsNotEmpty()
  @IsString()
  firstname: string

  @IsNotEmpty()
  @IsString()
  lastname: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @IsNotEmpty()
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