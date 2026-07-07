import { Controller, Body, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegistrationDto } from 'src/dto/Auth_Dto/auth.dto';
import { AuthLoginDto } from 'src/dto/Auth_Dto/auth_login.dto';
import { AuthUpdateDto } from 'src/dto/Auth_Dto/auth_update.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("auth-registration")
  authRegistration(@Body() authRegistrationDto: AuthRegistrationDto) {
    return this.authService.authRegister(authRegistrationDto);
  }

  @Post("auth-login")
  authLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.authLogin(authLoginDto);
  }

  @Get(":id")
  authGetById(@Param("id") id: string) {
    return this.authService.authFindById(id);
  }

  @Get("auth-find")
  authFindAll() {
    return this.authService.authFindAll();
  }

  @Patch(":id") 
  authUpdate(@Param("id") id: string, @Body() authUpdateDto: AuthUpdateDto) {
    return this.authService.authUpdateById(id, authUpdateDto)
  }

  @Delete(":id")
  authDelete(@Param("id") id: string) {
    return this.authService.authDeleteById(id)
  }
}
