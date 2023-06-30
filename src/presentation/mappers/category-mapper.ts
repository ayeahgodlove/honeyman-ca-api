// src/presentation/mappers/CategoryMapper.ts

import { Category } from "../../data/entities/category";
import { ICategory } from "../../domain/models/category";

export class CategoryMapper {
  toDTO(category: Category): ICategory {
    const categoryDTO: ICategory = {
        id: `${category.id}`,
        name: category.name,
        description: category.description,
        // deletedAt: category.deletedAt
    };
    return categoryDTO;
  }
  toDTOs(categories: Category[]): ICategory[] {
    const _categories = categories.map(category => {
      const categoryDTO: ICategory = {
        id: `${category.id}`,
        name: category.name,
        description: category.description
    };

      return categoryDTO
    })
    return _categories;
  }
}
