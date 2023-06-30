import { Request, Response } from "express";
import {
  ISubCategoryResponse,
} from "../../domain/models/category";
import { SubCategoryUseCase } from "../../domain/usecases/sub-category.usecase";
import { SubCategoryRepository } from "../../data/repositories/impl/sub-category.repository";
import { SubCategoryMapper } from "../mappers/sub-category-mapper";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { SubCategoryRequestDto } from "../dtos/sub-category-request.dto";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const subCategoryRepository = new SubCategoryRepository();
const subCategoryUseCase = new SubCategoryUseCase(subCategoryRepository);
const subCategoryMapper = new SubCategoryMapper();

export class SubCategoriesController {
  async createSubCategory(
    req: Request,
    res: Response<ISubCategoryResponse>
  ): Promise<void> {
    const dto = new SubCategoryRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        data: null,
        message: "Validations failed!",
        success: false,
        validationErrors: displayValidationErrors(validationErrors) as any,
      });
    }
    else {
      try {
     
        const subCategoryResponse = await subCategoryUseCase.createSubCategory(dto.toData());
  
        res.status(201).json({
          data: subCategoryResponse as any,
          message: "Sub Category created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(500).json({
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
    res: Response<ISubCategoryResponse>
  ): Promise<void> {
    try {
      const subCategories = await subCategoryUseCase.getAll();
      const subCategoryDTOs = subCategoryMapper.toDTOs(subCategories);
      res.json({
        data: subCategories as any,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      });
    }
  }

  async getSubCategoryById(
    req: Request,
    res: Response<ISubCategoryResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const subCategory = await subCategoryUseCase.getSubCategoryById(id);

      if (!subCategory) {
        throw new NotFoundException("SubCategory", id);
      }
      const subCategoryDTO = subCategoryMapper.toDTO(subCategory);
      res.json({
        data: subCategoryDTO,
        message: "Sub Category Found!",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: error,
        success: false,
      });
    }
  }

  async updateSubCategory(
    req: Request,
    res: Response<ISubCategoryResponse>
  ): Promise<void> {
    const dto = new SubCategoryRequestDto(req.body)
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
        const subCategory = await subCategoryUseCase.getSubCategoryById(id);
  
        if (!subCategory) {
          throw new NotFoundException("SubCategory", id)
        }
  
        const { name, description, categoryId } = req.body;
        if (name) {
          subCategory.name = name;
        }
        if (description) {
          subCategory.description = description;
        }
        if (categoryId) {
          subCategory.categoryId = categoryId;
        }
        subCategory.updatedAt = new Date();
  
        const subCategoryDTO1 = subCategoryMapper.toDTO(subCategory);
  
        const updatedSubCategory = await subCategoryUseCase.updateSubCategory(
          dto.toUpdateData(subCategoryDTO1)
        );
  
        res.json({
          data: updatedSubCategory as any,
          message: "SubCategory Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async deleteSubCategory(
    req: Request,
    res: Response<ISubCategoryResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const subCategory = await subCategoryUseCase.getSubCategoryById(id);

      if (!subCategory) {
        throw new NotFoundException("SubCategory", id);
      }

      const subCategoryDTO = subCategoryMapper.toDTO(subCategory);

      await subCategoryUseCase.deleteSubCategory(id);

      res.status(204).json({
        message: `${subCategoryDTO.name}`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [],
        success: true,
      });
    }
  }
}
