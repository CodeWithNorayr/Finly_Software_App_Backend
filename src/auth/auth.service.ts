import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Auth } from 'src/Schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from "@nestjs/jwt";
import { AuthRegistrationDto } from 'src/dto/Auth_Dto/auth.dto';
import { AuthLoginDto } from 'src/dto/Auth_Dto/auth_login.dto';
import { AuthUpdateDto } from 'src/dto/Auth_Dto/auth_update.dto';
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private readonly authSchema: Model<Auth>, private readonly jwtService: JwtService) { }

  async authRegister(authRegistrationDto: AuthRegistrationDto) {
    const authExists = await this.authSchema.findOne({ email: authRegistrationDto.email })

    if (authExists) throw new ConflictException("User exists");

    const hashedPassword = await bcrypt.hash(authRegistrationDto.password, 10);

    const auth = await this.authSchema.create({
      ...authRegistrationDto,
      password: hashedPassword
    })

    const payload = {
      sub: auth._id,
      firstname: auth.firstname
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      id: auth._id,
      firstname: auth.firstname,
      lastname: auth.lastname,
      email: auth.email,
      age: auth.age,
      professions: auth.professions,
      student: auth.student,
      aim: auth.aim,
      access_token: token
    }
  }

  async authLogin(authLoginDto: AuthLoginDto) {
    const auth = await this.authSchema.findOne({ email: { $eq: authLoginDto.email } });
    if (!auth) throw new NotFoundException("User is not found");

    const isMatching = await bcrypt.compare(authLoginDto.password, auth.password);
    if (!isMatching) throw new BadRequestException("Password is not matching");

    const payload = {
      sub: auth._id,
      firstname: auth.firstname
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      id: auth._id,
      firstname: auth.firstname,
      lastname: auth.lastname,
      email: auth.email,
      age: auth.age,
      professions: auth.professions,
      student: auth.student,
      aim: auth.aim,
      access_token: token
    }
  }

  async authFindById(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id");

    const authFindById = await this.authSchema.findById(id).select("-password");
    if (!authFindById) throw new NotFoundException("User is not found");

    return authFindById
  }

  async authDeleteById(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id");

    const authDeleted = await this.authSchema.findByIdAndDelete(id);

    if (!authDeleted) throw new NotFoundException("Auth is not found");

    return authDeleted;
  }

  async authUpdateById(id: string, authUpdateDto: AuthUpdateDto) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("Invalid Id");

    if (authUpdateDto.password) {
      authUpdateDto.password = await bcrypt.hash(authUpdateDto.password, 10)
    }

    const authUpdated = await this.authSchema.findByIdAndUpdate(id, authUpdateDto)

    if (!authUpdated) throw new NotFoundException("User is not found");

    return authUpdated;
  }

  async authFindAll() {
    return await this.authSchema.find().select("-password");
  }
}
