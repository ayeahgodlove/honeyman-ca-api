import { Request, Response } from "express";
import {
  IStore,
  IStoreResponse,
  emptyStore,
} from "../../domain/models/store";
import { StoreUseCase } from "../../domain/usecases/store.usecase";
import { StoreRepository } from "../../data/repositories/impl/store.repository";
import { StoreMapper } from "../mappers/mapper";
import { StoreRequestDto } from "../dtos/store-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const storeRepository = new StoreRepository();
const storeUseCase = new StoreUseCase(storeRepository);
const storeMapper = new StoreMapper();

export class StoresController {
  async createStore(
    req: Request,
    res: Response<IStoreResponse>
  ): Promise<void> {
    const dto = new StoreRequestDto(req.body);
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
        const storeResponse = await storeUseCase.createStore(
          dto.toData()
        );

        res.status(201).json({
          data: storeResponse.toJSON<IStore>(),
          message: "Store created Successfully!",
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
      const stores = await storeUseCase.getAll();
      const storesDTO = storeMapper.toDTOs(stores);

      res.json({
        data: storesDTO,
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

  async getStoreById(
    req: Request,
    res: Response<IStoreResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const store = await storeUseCase.getStoreById(id);
      if (!store) {
        throw new NotFoundException("Store", id);
      }
      const storeDTO = storeMapper.toDTO(store);
      res.json({
        data: storeDTO,
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

  async updateStore(
    req: Request,
    res: Response<IStoreResponse>
  ): Promise<void> {
    const dto = new StoreRequestDto(req.body);
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

        const obj: IStore = {
          ...emptyStore,
          ...req.body,
          id: id,
        };
        const updatedStore = await storeUseCase.updateStore(obj);
        const storeDto = storeMapper.toDTO(updatedStore);

        res.json({
          data: storeDto,
          message: "Store Updated Successfully!",
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

  async deleteStore(
    req: Request,
    res: Response<IStoreResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      await storeUseCase.deleteStore(id);

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
