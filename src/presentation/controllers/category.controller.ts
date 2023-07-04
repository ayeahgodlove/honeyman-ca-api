import { Request, Response } from "express";
import {
  ICategory,
  ICategoryResponse,
  emptyCategory,
} from "../../domain/models/category";
import { CategoryUseCase } from "../../domain/usecases/category.usecase";
import { CategoryRepository } from "../../data/repositories/impl/category.repository";
import { CategoryMapper } from "../mappers/category-mapper";
import { CategoryRequestDto } from "../dtos/category-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const categoryRepository = new CategoryRepository();
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryMapper = new CategoryMapper();

export class CategoriesController {
  async createCategory(req: Request, res: Response<ICategoryResponse>): Promise<void> {
    const dto = new CategoryRequestDto(req.body);
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
        
        const categoryResponse = await categoryUseCase.createCategory(dto.toData());
  
        res.status(201).json({
          data: categoryResponse.toJSON<ICategory>(),
          message: "Category created Successfully!",
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
    res: Response<any>
  ): Promise<void> {
    try {

      const categories = await categoryUseCase.getAll();
      const categoriesDTO = categoryMapper.toDTOs(categories);
      res.json({
        data: categoriesDTO,
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

  async getCategoryById(
    req: Request,
    res: Response<ICategoryResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const category = await categoryUseCase.getCategoryById(id);
      
      if (!category) {
        throw new NotFoundException("Category", id);
      }
      const categoryDTO = categoryMapper.toDTO(category)
      res.json({
        data: categoryDTO,
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

  async updateCategory(
    req: Request,
    res: Response<ICategoryResponse>
  ): Promise<void> {
    const dto = new CategoryRequestDto(req.body)
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
        const obj: ICategory = {
          ...emptyCategory,
          ...req.body,
          ...dto,
          id: id,
        };
        
        const category = await categoryUseCase.getCategoryById(id);
        
        if (!category) {
          throw new NotFoundException("Category", id);
        }
  
        const updatedCategory = await categoryUseCase.updateCategory(obj);
        const categoryDto = categoryMapper.toDTO(updatedCategory);
  
        res.json({
          data: categoryDto,
          message: "Category Updated Successfully!",
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

  async deleteCategory(
    req: Request,
    res: Response<ICategoryResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const category = await categoryUseCase.getCategoryById(id);

      if (!category) {
          throw new NotFoundException("Category", id);
      }

      await categoryUseCase.deleteCategory(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
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
