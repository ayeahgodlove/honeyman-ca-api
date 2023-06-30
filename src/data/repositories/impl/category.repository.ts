import { Category } from "../../entities/category";
import { ICategoryRepository } from "../contracts/icategory.repository";
import { ICategory } from "../../../domain/models/category";

export class CategoryRepository implements ICategoryRepository {
    /**
     *
     */
    constructor() {}

    /**
     * Receives a Category as parameter
     * @category
     * returns void
     */
    async create(category: ICategory): Promise<Category> {
     try {
       return await Category.create<Category>(category as any);
     } catch (error) {
       throw error;
     }
    }

    /**
     * Receives a String as parameter
     * @id
     * returns Category
     */
    async findById(id: string): Promise<Category | null>{
      try {
        const categoryItem = await Category.findByPk(id);
        return categoryItem;
      } catch (error) {
        throw error;
      }
    }

     /**
     * Receives a String as parameter
     * @name
     * returns Category
     */
      async findByName(name: string): Promise<Category | null>{
        try {
          const categoryItem = await Category.findOne({ where: {name}});
          return categoryItem;
        } catch (error) {
          throw error;
        }
      }

    /*
     * Returns an array of Category
     */
    async getAll(): Promise<Category[]> {
      try {
        const categories = await Category.findAll();
        return categories;
      } catch (error) {
        throw error;
      }
    };

    /**
     * Receives a Category as parameter
     * @category
     * returns void
     */
    async update(category: ICategory): Promise<Category> {
      const {id, name, description} = category;
      try {
        const categoryItem: any = await Category.findByPk(id);
        return await categoryItem?.update({
          id,
          name,
          description,
        });
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
        const categoryItem = await Category.findByPk(id);
        await categoryItem?.destroy({
          force: true,
        });
      } catch (error) {
        throw error;
      }
    }
  }