import { Request, Response } from "express";
import {
  IPaymentResponse,
} from "../../domain/models/payment";
import { PaymentUseCase } from "../../domain/usecases/payment.usecase";
import { PaymentRepository } from "../../data/repositories/impl/payment.repository";
import { PaymentMapper } from "../mappers/payment-mapper";
import { PaymentRequestDto } from "../dtos/payment-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";

const paymentRepository = new PaymentRepository();
const paymentUseCase = new PaymentUseCase(paymentRepository);
const paymentMapper = new PaymentMapper();

export class PaymentsController {
  async createPayment(req: Request, res: Response<IPaymentResponse>): Promise<void> {
    const dto = new PaymentRequestDto(req.body);
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
        
        const paymentResponse = await paymentUseCase.createPayment(dto.toData());
        const paymentDTO = paymentMapper.toDTO(paymentResponse) //convert entity to DTO
  
        res.status(201).json({
          data: paymentResponse as any,
          message: "Payment created Successfully!",
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
    res: Response<IPaymentResponse>
  ): Promise<void> {
    try {

      const categories = await paymentUseCase.getAll();
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

  async getPaymentById(
    req: Request,
    res: Response<IPaymentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const payment = await paymentUseCase.getPaymentById(id);
      
      if (!payment) {
        throw new NotFoundException("Payment", id);
      }
      const paymentDTO = paymentMapper.toDTO(payment)
      res.json({
        data: paymentDTO,
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

  async updatePayment(
    req: Request,
    res: Response<IPaymentResponse>
  ): Promise<void> {
    const dto = new PaymentRequestDto(req.body)
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
      
        const payment = await paymentUseCase.getPaymentById(id);
        
        if (!payment) {
          throw new NotFoundException("Payment", id);
        }
  
        payment.amount = dto.amount;
        payment.orderId = dto.orderId;
        payment.userId = dto.userId;
        payment.status = dto.status;
        payment.updatedAt = new Date();
  
        const paymentDTO1 = paymentMapper.toDTO(payment)
  
        const updatedPayment = await paymentUseCase.updatePayment(dto.toUpdateData(paymentDTO1));
        const paymentDTO2 = paymentMapper.toDTO(updatedPayment);
  
        res.json({
          data: paymentDTO2,
          message: "Payment Updated Successfully!",
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

  async deletePayment(
    req: Request,
    res: Response<IPaymentResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const payment = await paymentUseCase.getPaymentById(id);

      if (!payment) {
          throw new NotFoundException("Payment", id);
      }

      const paymentDTO = paymentMapper.toDTO(payment)

      await paymentUseCase.deletePayment(id);

      res.status(204).json({
        message: `${paymentDTO.id}`,
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
