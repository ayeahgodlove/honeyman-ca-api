import { Request, Response } from "express";
import {
  IProductImageResponse,
} from "../../domain/models/product-image";
import { ProductImageUseCase } from "../../domain/usecases/product-image.usecase";
import { ProductImageRepository } from "../../data/repositories/impl/product-image.repository";
import { ProductImageMapper } from "../mappers/product-image-mapper";
import { ProductImageRequestDto } from "../dtos/product-image-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const productImageRepository = new ProductImageRepository();
const productImageUseCase = new ProductImageUseCase(productImageRepository);
const productImageMapper = new ProductImageMapper();

export class CategoriesController {
  async createProductImage(req: Request, res: Response<IProductImageResponse>): Promise<void> {
    const dto = new ProductImageRequestDto(req.body);
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
        
        const productImageResponse = await productImageUseCase.createProductImage(dto.toData());
        const productImageDTO = productImageMapper.toDTO(productImageResponse) //convert entity to DTO
  
        res.status(201).json({
          data: productImageResponse as any,
          message: "Product Image created Successfully!",
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
    res: Response<IProductImageResponse>
  ): Promise<void> {
    try {

      const categories = await productImageUseCase.getAll();
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

  async getProductImageById(
    req: Request,
    res: Response<IProductImageResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const productImage = await productImageUseCase.getProductImageById(id);
      
      if (!productImage) {
        throw new NotFoundException("Product Image", id);
      }
      const productImageDTO = productImageMapper.toDTO(productImage)
      res.json({
        data: productImageDTO,
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

  async updateProductImage(
    req: Request,
    res: Response<IProductImageResponse>
  ): Promise<void> {
    const dto = new ProductImageRequestDto(req.body)
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
      
        const productImage = await productImageUseCase.getProductImageById(id);
        
        if (!productImage) {
          throw new NotFoundException("Product Image", id);
        }
  
        productImage.name = dto.name;
        productImage.productId = dto.productId;
        productImage.shortDescription = dto.shortDescription;
        productImage.url = dto.url;
        productImage.updatedAt = new Date();
  
        const productImageDTO1 = productImageMapper.toDTO(productImage)
  
        const updatedProductImage = await productImageUseCase.updateProductImage(dto.toUpdateData(productImageDTO1));
        const productImageDTO2 = productImageMapper.toDTO(updatedProductImage);
  
        res.json({
          data: productImageDTO2,
          message: "Product Image Updated Successfully!",
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

  async deleteProductImage(
    req: Request,
    res: Response<IProductImageResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const productImage = await productImageUseCase.getProductImageById(id);

      if (!productImage) {
          throw new NotFoundException("ProductImage", id);
      }

      const productImageDTO = productImageMapper.toDTO(productImage)

      await productImageUseCase.deleteProductImage(id);

      res.status(204).json({
        message: `${productImageDTO.name}`,
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
