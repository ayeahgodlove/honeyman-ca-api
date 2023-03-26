import slugify from "slugify";
import { SubCategory } from "../../entities/sub-category";
import { ISubCategoryRepository } from "../contracts/isub-category.repository";
import { ISubCategory } from "../../../domain/models/category";

export class SubCategoryRepository implements ISubCategoryRepository {
    /**
     *
     */
    constructor() {}

    /**
     * Receives a SubCategory as parameter
     * @Subcategory
     * returns void
     */
    async create(subCategory: ISubCategory): Promise<SubCategory> {
     try {
       return await SubCategory.create<SubCategory>(subCategory as any);
     } catch (error) {
       throw error;
     }
    }

    /**
     * Receives a String as parameter
     * @id
     * returns SubCategory
     */
    async findById(id: string): Promise<SubCategory | null>{
      try {
        const subCategoryItem = await SubCategory.findByPk(id);
        return subCategoryItem;
      } catch (error) {
        throw error;
      }
    }

     /**
     * Receives a String as parameter
     * @name
     * returns SubCategory
     */
      async findByName(name: string): Promise<SubCategory | null>{
        try {
          const subCategoryItem = await SubCategory.findOne({ where: {name}});
          return subCategoryItem;
        } catch (error) {
          throw error;
        }
      }

    /*
     * Returns an array of SubCategory
     */
    async getAll(): Promise<SubCategory[]> {
      try {
        const subCategories = await SubCategory.findAll();
        return subCategories;
      } catch (error) {
        throw error;
      }
    };

    /**
     * Receives a SubCategory as parameter
     * @Subcategory
     * returns void
     */
    async update(subCategory: ISubCategory): Promise<SubCategory> {
      const {id, name, description, updatedAt, categoryId} = subCategory;
      try {
        const subCategoryItem: any = await SubCategory.findByPk(id);
        return await subCategoryItem?.update({
          id,
          categoryId,
          name,
          slug: slugify(name, "-"),
          description,
          updatedAt,
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
        const subCategoryItem = await SubCategory.findByPk(id);
        await subCategoryItem?.destroy({
          force: true,
        });
      } catch (error) {
        throw error;
      }
    }
  }