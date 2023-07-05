// src/presentation/mappers/CategoryMapper.ts

import { Branch } from "../../data/entities/branch";
import { Category } from "../../data/entities/category";
import { Store } from "../../data/entities/store";
import { IBranch } from "../../domain/models/branch";
import { ICategory } from "../../domain/models/category";
import { IStore } from "../../domain/models/store";

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

export class BranchMapper {
  toDTO(branch: Branch): IBranch {
    const entity = branch.toJSON<IBranch>();
    return entity;
  }
  toDTOs(branches: Branch[]): IBranch[] {
    const _branches = branches.map((branch) => {
      const entity = branch.toJSON<IBranch>();
      return entity;
    });
    return _branches;
  }
}

export class StoreMapper {
  toDTO(store: Store): IStore {
    const entity = store.toJSON<IStore>();
    return entity;
  }
  toDTOs(stores: Store[]): IStore[] {
    const _stores = stores.map((store) => {
      const entity = store.toJSON<IStore>();
      return entity;
    });
    return _stores;
  }
}