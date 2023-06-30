// src/presentation/dtos/ReviewRequestDto.ts

import {  IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IReview, emptyReview } from "../../domain/models/review";
import { v4 } from "uuid";

// rating: number;
export class ReviewRequestDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  constructor(data: IReview) {
    this.description = data.description;
    this.userId = data.userId;
    this.productId = data.productId;
    this.rating = data.rating;
  }

  toData(): IReview {
    return {
      ...emptyReview,
      id: v4(),
      description: this.description,
      rating: this.rating,
      userId: this.userId,
      productId: this.productId,
    };
  }

  toUpdateData(data: IReview): IReview {
    return {
      id: data.id,
      description: data.description,
      rating: data.rating,
      userId: data.userId,
      productId: data.productId,
    }
  }
}
