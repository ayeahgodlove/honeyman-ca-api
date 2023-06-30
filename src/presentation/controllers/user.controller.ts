import { Request, Response } from "express";
import {
  IUser,
  IUserResponse,
  emptyUser,
} from "../../domain/models/user";
import { UserUseCase } from "../../domain/usecases/user.usecase";
import { UserRepository } from "../../data/repositories/impl/user.repository";
import { UserRequestDto } from "../dtos/user-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { UserMapper } from "../mappers/user-mapper";
import * as bcrypt from "bcrypt";

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);
const userMapper = new UserMapper();

export class UsersController {
  async createUser(req: Request, res: Response<IUserResponse>): Promise<void> {
    const dto = new UserRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({ 
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!"
      });
    }
    else {
      try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        dto.password = hashPassword;
        const userResponse = await userUseCase.createUser(dto.toData());
  
        res.status(201).json({
          data: userResponse.toJSON<IUser>(),
          message: "User created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async getAll(
    req: Request,
    res: Response<IUser[] |IUserResponse>
  ): Promise<void> {
    try {

      const users = await userUseCase.getAll();
      const usersDTO = userMapper.toDTOs(users);
      res.json(usersDTO);
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getUserById(
    req: Request,
    res: Response<IUserResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const user = await userUseCase.getUserById(id);
      
      if (!user) {
        throw new NotFoundException("User", id);
      }
      const userDTO = userMapper.toDTO(user)
      res.json({
        data: userDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateUser(
    req: Request,
    res: Response<IUserResponse>
  ): Promise<void> {
    const dto = new UserRequestDto(req.body)
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({ 
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!"
      });
    }
    else {
      try {
        const id = req.params.id;
      
        const user = await userUseCase.getUserById(id);
        
        if (!user) {
          throw new NotFoundException("User", id);
        }
  
        user.username = dto.username;
        user.firstname = dto.firstname;
        // user.address = dto.address;
        user.lastname = dto.lastname;
        user.email = dto.email;
        user.password = dto.password;
        user.phoneNumber =  dto.phoneNumber;
        user.updatedAt = new Date();
  
        const obj: IUser = {
          ...emptyUser,
          ...req.body,
          ...user,
          id: id,
        };
  
        const updatedUser = await userUseCase.updateUser(obj);
        const userDTO = userMapper.toDTO(updatedUser);
  
        res.json({
          data: userDTO,
          message: "User Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteUser(
    req: Request,
    res: Response<IUserResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const user = await userUseCase.getUserById(id);

      if (!user) {
          throw new NotFoundException("User", id);
      }

      const userDTO = userMapper.toDTO(user)

      await userUseCase.deleteUser(id);

      res.status(204).json({
        message: `${userDTO.username}`,
        validationErrors: [],
        success: true,
        data: null
      });
    } catch (error: any) {
      res
        .status(400)
        .json({
          message: error.message,
          data: null,
          validationErrors: [error],
          success: true,
        });
    }
  }
}
