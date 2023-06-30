import { User } from "../../entities/user";
import { IUserRepository } from "../contracts/iuser.repository";
import { IUser } from "../../../domain/models/user";

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
     try {
       return await User.create<User>(user as any);
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
      try {
        const userItem: any = await User.findByPk(user.id);
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
        await userItem?.destroy({
          force: true,
        });
      } catch (error) {
        throw error;
      }
    }
  }