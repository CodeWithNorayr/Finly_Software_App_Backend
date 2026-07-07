import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

@Schema()
export class Auth {

  @Prop({required: true})
  firstname: string

  @Prop({required: true})
  lastname: string

  @Prop({required: true, unique: true})
  email: string

  @Prop({required: true})
  password: string

  @Prop({required: false})
  aim: string

  @Prop({required: false})
  age: number

  @Prop({required: false})
  professions: string // I am going to build select - options logic in frontend that's why I choose to move forward with string type not building an array here

  @Prop({required: false})
  student: boolean

}

export const AuthSchema = SchemaFactory.createForClass(Auth);

