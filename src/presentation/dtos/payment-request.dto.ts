// src/presentation/dtos/PaymentRequestDto.ts

import {  IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { IPayment, emptyPayment } from "../../domain/models/payment";
import { v4 } from "uuid";

// status: string;
export class PaymentRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  status: string;


  @IsNotEmpty()
  @IsNumber()
  amount: number;

  constructor(data: IPayment) {
    this.amount = data.amount;
    this.userId = data.userId;
    this.orderId = data.orderId;
    this.status = data.status;
  }

  toData(): IPayment {
    return {
      ...emptyPayment,
      id: v4(),
      amount: this.amount,
      userId: this.userId,
      orderId: this.orderId,
      status: this.status,
    };
  }

  toUpdateData(data: IPayment): IPayment {
    return {
      id: data.id,
      amount: data.amount,
      userId: data.userId,
      orderId: data.orderId,
      status: data.status,
    }
  }
}
