// src/presentation/dtos/ProductRequestDto.ts

import {  IsNotEmpty, IsString, IsNumber } from "class-validator";
import { IProduct, emptyProduct } from "../../domain/models/product";
import { v4 } from "uuid";

export class ProductRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  quantity: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  subCategoryId: string;



  constructor(data: IProduct) {
    this.name = data.name;
    this.amount = data.amount;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.subCategoryId = data.subCategoryId;
    this.shortDescription = data.shortDescription;
    this.quantity = data.quantity;
  }

  toData(): IProduct {
    return {
      ...emptyProduct,
      id: v4(),
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId,
      amount: this.amount,
      shortDescription: this.shortDescription,
      quantity: this.quantity
    };
  }

  toUpdateData(data: IProduct): IProduct {
    return {
      id: data.id,
      amount: data.amount,
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      quantity: data.quantity,
      shortDescription: data.shortDescription
    }
  }
}
