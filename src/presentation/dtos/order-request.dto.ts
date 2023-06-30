// src/presentation/dtos/OrderRequestDto.ts

import {  IsNotEmpty, IsString, IsNumber } from "class-validator";
import { IOrder, emptyOrder } from "../../domain/models/order";
import { v4 } from "uuid";

export class OrderRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  orderNo: string;



  constructor(data: IOrder) {
    this.userId = data.userId;
    this.status = data.status;
    this.orderNo = data.orderNo;
    this.total = data.total;
  }

  toData(): IOrder {
    return {
      ...emptyOrder,
      id: v4(),
      orderNo: this.orderNo,
      status: this.status,
      userId: this.userId,
      total: this.total,
    };
  }

  toUpdateData(data: IOrder): IOrder {
    return {
      id: data.id,
      orderNo: data.orderNo,
      status: data.status,
      total: data.total,
      userId: data.userId,
      productId: data.productId,
      unitPrice: data.unitPrice
    }
  }
}
