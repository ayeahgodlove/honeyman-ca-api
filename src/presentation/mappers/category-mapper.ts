// src/presentation/mappers/CategoryMapper.ts

import { Category } from "../../data/entities/category";
import { ICategory } from "../../domain/models/category";

export class CategoryMapper {
  toDTO(category: Category): ICategory {
    const categoryDTO: ICategory = {
        id: `${category.id}`,
        name: category.name,
        slug: category.slug,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        // deletedAt: category.deletedAt
    };
    return categoryDTO;
  }
  toDTOs(categories: Category[]): ICategory[] {
    const _categories = categories.map(category => {
      const categoryDTO: ICategory = {
        id: `${category.id}`,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        slug: category.slug,
        description: category.description
    };

      return categoryDTO
    })
    return _categories;
  }
}
