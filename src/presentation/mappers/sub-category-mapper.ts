// src/presentation/mappers/CategoryMapper.ts

import { SubCategory } from "../../data/entities/sub-category";
import { ISubCategory } from "../../domain/models/category";

export class SubCategoryMapper {
  toDTO(subCategory: SubCategory): ISubCategory {
    const subCategoryDTO: ISubCategory = {
        id: `${subCategory.id}`,
        name: subCategory.name,
        description: subCategory.description,
        categoryId: subCategory.categoryId
    };
    return subCategoryDTO;
  }
  toDTOs(categories: SubCategory[]): ISubCategory[] {
    const _subCategories = categories.map(subCategory => {
      const subCategoryDTO: ISubCategory = {
        id: `${subCategory.id}`,
        name: subCategory.name,
        description: subCategory.description,
        categoryId: subCategory.categoryId
    };

      return subCategoryDTO
    })
    return _subCategories;
  }
}
