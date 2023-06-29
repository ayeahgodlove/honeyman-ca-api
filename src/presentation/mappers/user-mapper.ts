// src/presentation/mappers/UserMapper.ts

import { User } from "../../data/entities/user";
import { IUser } from "../../domain/models/user";

export class UserMapper {
  toDTO(user: User): IUser {
    const userDTO: IUser = {
        id: `${user.id}`,
        username: user.username,
        firstname: user.firstname,
        address: user.address,
        email: user.email,
        password: user.password,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber
    };
    return userDTO;
  }
  toDTOs(users: User[]): IUser[] {
    const _users = users.map(user => {
      const userDTO: IUser = {
        id: `${user.id}`,
        firstname: user.firstname,
        username: user.username,
        lastname: user.lastname,
        address: user.address,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber
    };

      return userDTO
    })
    return _users;
  }
}
