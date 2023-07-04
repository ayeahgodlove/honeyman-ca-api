import { User } from "../../entities/user";
import { IUserRepository } from "../contracts/iuser.repository";
import { IUser } from "../../../domain/models/user";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import * as bcrypt from "bcrypt";
export class UserRepository implements IUserRepository {
    /**
     *
     */
    constructor() {}

    /**
     * Receives a User as parameter
     * @user
     * returns void
     */
    async create(user: IUser): Promise<User> {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

     try {
       return await User.create<User>(user);
     } catch (error) {
       throw error;
     }
    }

    /**
     * Receives a String as parameter
     * @id
     * returns User
     */
    async findById(id: string): Promise<User | null>{
      try {
        const userItem = await User.findByPk(id);
        if (!userItem) {
          throw new NotFoundException("User", id);
        }
        return userItem;
      } catch (error) {
        throw error;
      }
    }

     /**
     * Receives a String as parameter
     * @name
     * returns User
     */
      async findByName(username: string): Promise<User | null>{
        try {
          const userItem = await User.findOne({ where: {username}});
          return userItem;
        } catch (error) {
          throw error;
        }
      }

    /*
     * Returns an array of User
     */
    async getAll(): Promise<User[]> {
      try {
        const categories = await User.findAll();
        return categories;
      } catch (error) {
        throw error;
      }
    };

    /**
     * Receives a User as parameter
     * @user
     * returns void
     */
    async update(user: IUser): Promise<User> {
      const { id } = user;
      try {
        const userItem: any = await User.findByPk(user.id);
        if (!userItem) {
          throw new NotFoundException("User", id);
        }
        return await userItem?.update(user);
      } catch (error) {
        throw error;
      }
    }

    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id: string): Promise<void> {
      try {
        const userItem = await User.findByPk(id);
        if (!userItem) {
          throw new NotFoundException("User", id);
        }
        await userItem?.destroy({
          force: true,
        });
      } catch (error) {
        throw error;
      }
    }
  }