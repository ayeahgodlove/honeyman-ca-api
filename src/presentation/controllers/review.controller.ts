import { Request, Response } from "express";
import {
  IReviewResponse,
} from "../../domain/models/review";
import { ReviewUseCase } from "../../domain/usecases/review.usecase";
import { ReviewRepository } from "../../data/repositories/impl/review.repository";
import { ReviewMapper } from "../mappers/review-mapper";
import { ReviewRequestDto } from "../dtos/review-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const reviewRepository = new ReviewRepository();
const reviewUseCase = new ReviewUseCase(reviewRepository);
const reviewMapper = new ReviewMapper();

export class ReviewsController {
  async createReview(req: Request, res: Response<IReviewResponse>): Promise<void> {
    const dto = new ReviewRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({ 
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!"
      });
    }
    else {
      try {
        
        const reviewResponse = await reviewUseCase.createReview(dto.toData());
        const reviewDTO = reviewMapper.toDTO(reviewResponse) //convert entity to DTO
  
        res.status(201).json({
          data: reviewResponse as any,
          message: "Review created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async getAll(
    req: Request,
    res: Response<IReviewResponse>
  ): Promise<void> {
    try {

      const categories = await reviewUseCase.getAll();
      res.json({
        data: categories as any,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getReviewById(
    req: Request,
    res: Response<IReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const review = await reviewUseCase.getReviewById(id);
      
      if (!review) {
        throw new NotFoundException("Review", id);
      }
      const reviewDTO = reviewMapper.toDTO(review)
      res.json({
        data: reviewDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateReview(
    req: Request,
    res: Response<IReviewResponse>
  ): Promise<void> {
    const dto = new ReviewRequestDto(req.body)
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({ 
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!"
      });
    }
    else {
      try {
        const id = req.params.id;
      
        const review = await reviewUseCase.getReviewById(id);
        
        if (!review) {
          throw new NotFoundException("Review", id);
        }
  
        review.rating = dto.rating;
        review.userId = dto.userId;
        review.productId = dto.productId;
        review.description = dto.description;
        review.updatedAt = new Date();
  
        const reviewDTO1 = reviewMapper.toDTO(review)
  
        const updatedReview = await reviewUseCase.updateReview(dto.toUpdateData(reviewDTO1));
        const reviewDTO2 = reviewMapper.toDTO(updatedReview);
  
        res.json({
          data: reviewDTO2,
          message: "Review Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteReview(
    req: Request,
    res: Response<IReviewResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const review = await reviewUseCase.getReviewById(id);

      if (!review) {
          throw new NotFoundException("Review", id);
      }

      const reviewDTO = reviewMapper.toDTO(review)

      await reviewUseCase.deleteReview(id);

      res.status(204).json({
        message: `${reviewDTO.id}`,
        validationErrors: [],
        success: true,
        data: null
      });
    } catch (error: any) {
      res
        .status(400)
        .json({
          message: error.message,
          data: null,
          validationErrors: [error],
          success: true,
        });
    }
  }
}
