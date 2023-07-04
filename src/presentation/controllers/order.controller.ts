import { Request, Response } from "express";
import {
  IOrder,
  IOrderResponse,
  emptyOrder,
} from "../../domain/models/order";
import { OrderUseCase } from "../../domain/usecases/order.usecase";
import { OrderRepository } from "../../data/repositories/impl/order.repository";
import { OrderMapper } from "../mappers/order-mapper";
import { OrderRequestDto } from "../dtos/order-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const orderRepository = new OrderRepository();
const orderUseCase = new OrderUseCase(orderRepository);
const orderMapper = new OrderMapper();

export class OrdersController {
  async createOrder(req: Request, res: Response<IOrderResponse>): Promise<void> {
    const dto = new OrderRequestDto(req.body);
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
        
        const orderResponse = await orderUseCase.createOrder(dto.toData());
  
        res.status(201).json({
          data: orderResponse.toJSON<IOrder>(),
          message: "Order created Successfully!",
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
    res: Response<IOrderResponse>
  ): Promise<void> {
    try {

      const orders = await orderUseCase.getAll();
      const ordersDTO = orderMapper.toDTOs(orders);

      res.json({
        data: ordersDTO,
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

  async getOrderById(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const order = await orderUseCase.getOrderById(id);
      
      if (!order) {
        throw new NotFoundException("Order", id);
      }
      const orderDTO = orderMapper.toDTO(order)
      res.json({
        data: orderDTO,
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

  async updateOrder(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    const dto = new OrderRequestDto(req.body)
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
        const obj: IOrder = {
          ...emptyOrder,
          ...req.body,
          ...dto,
          id: id,
        };
      
        const order = await orderUseCase.getOrderById(id);
        
        if (!order) {
          throw new NotFoundException("Order", id);
        }
  

        const updatedOrder = await orderUseCase.updateOrder(obj);
        const orderDto = orderMapper.toDTO(updatedOrder);
  
        res.json({
          data: orderDto,
          message: "Order Updated Successfully!",
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

  async deleteOrder(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const order = await orderUseCase.getOrderById(id);

      if (!order) {
          throw new NotFoundException("Order", id);
      }

      await orderUseCase.deleteOrder(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
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
