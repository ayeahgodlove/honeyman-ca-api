// src/presentation/dtos/UserRequestDto.ts

import {  IsNotEmpty, IsString, IsStrongPassword, IsEmail } from "class-validator";
import { IUser, emptyUser } from "../../domain/models/user";
import { v4 } from "uuid";
import slugify from "slugify";

export class UserRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  constructor(data: IUser) {
    this.username = data.username;
    this.firstname = data.firstname;
    this.email = data.email;
    this.lastname = data.lastname;
    this.password = data.password;
    this.phoneNumber = data.phoneNumber
  }

  toData(): IUser {
    return {
      ...emptyUser,
      id: v4(),
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };
  }

  toUpdateData(data: IUser): IUser {
    return {
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      phoneNumber: data.phoneNumber,
      address: data.address,
      email: data.email,
      password: data.password,
    }
  }
}
