// src/presentation/mappers/OrderMapper.ts

import { Order } from "../../data/entities/order";
import { IOrder } from "../../domain/models/order";

export class OrderMapper {
  toDTO(order: Order): IOrder {
    const orderDTO: IOrder = {
      id: `${order.id}`,
      orderNo: order.orderNo,
      status: order.status,
      total: order.total,
      userId: order.userId,
      productId: order.productId,
      unitPrice: 0
    };
    return orderDTO;
  }
  toDTOs(orders: Order[]): IOrder[] {
    const _orders = orders.map((order) => {
      const orderDTO: IOrder = {
        id: `${order.id}`,
        orderNo: order.orderNo,
        status: order.status,
        total: order.total,
        userId: order.userId,
        productId: order.productId,
        unitPrice: 0,
      };

      return orderDTO;
    });
    return _orders;
  }
}
