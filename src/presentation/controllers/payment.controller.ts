import { Request, Response } from "express";
import {
  IPayment,
  IPaymentResponse,
  emptyPayment,
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
  
        res.status(201).json({
          data: paymentResponse.toJSON<IPayment>(),
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

      const payments = await paymentUseCase.getAll();
      const paymentsDTO = paymentMapper.toDTOs(payments);
      res.json({
        data: paymentsDTO,
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
      const paymentDTO = paymentMapper.toDTO(payment);
      
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

        const obj: IPayment = {
          ...emptyPayment,
          ...req.body,
          ...dto,
          id: id,
        };
        
        const payment = await paymentUseCase.getPaymentById(id);
        
        if (!payment) {
          throw new NotFoundException("Payment", id);
        }
  
        const updatedPayment = await paymentUseCase.updatePayment(obj);
        const paymentDto = paymentMapper.toDTO(updatedPayment);
  
        res.json({
          data: paymentDto,
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

      await paymentUseCase.deletePayment(id);

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
