import { Request, Response } from "express";
import {
  IBranch,
  IBranchResponse,
  emptyBranch,
} from "../../domain/models/branch";
import { BranchUseCase } from "../../domain/usecases/branch.usecase";
import { BranchRepository } from "../../data/repositories/impl/branch.repository";
import { BranchMapper } from "../mappers/mapper";
import { BranchRequestDto } from "../dtos/branch-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const branchRepository = new BranchRepository();
const branchUseCase = new BranchUseCase(branchRepository);
const branchMapper = new BranchMapper();

export class BranchesController {
  async createBranch(
    req: Request,
    res: Response<IBranchResponse>
  ): Promise<void> {
    const dto = new BranchRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const branchResponse = await branchUseCase.createBranch(
          dto.toData()
        );

        res.status(201).json({
          data: branchResponse.toJSON<IBranch>(),
          message: "Branch created Successfully!",
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

  async getAll(req: Request, res: Response<any>): Promise<void> {
    try {
      const branches = await branchUseCase.getAll();
      const branchesDTO = branchMapper.toDTOs(branches);

      res.json({
        data: branchesDTO,
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

  async getBranchById(
    req: Request,
    res: Response<IBranchResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const branch = await branchUseCase.getBranchById(id);
      if (!branch) {
        throw new NotFoundException("Branch", id);
      }
      const branchDTO = branchMapper.toDTO(branch);
      res.json({
        data: branchDTO,
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

  async updateBranch(
    req: Request,
    res: Response<IBranchResponse>
  ): Promise<void> {
    const dto = new BranchRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;

        const obj: IBranch = {
          ...emptyBranch,
          ...req.body,
          id: id,
        };
        const updatedBranch = await branchUseCase.updateBranch(obj);
        const branchDto = branchMapper.toDTO(updatedBranch);

        res.json({
          data: branchDto,
          message: "Branch Updated Successfully!",
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

  async deleteBranch(
    req: Request,
    res: Response<IBranchResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await branchUseCase.deleteBranch(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: true,
      });
    }
  }
}
