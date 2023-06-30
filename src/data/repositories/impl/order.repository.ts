import { Order } from "../../entities/order";
import { IOrderRepository } from "../contracts/iorder.repository";
import { IOrder } from "../../../domain/models/order";

export class OrderRepository implements IOrderRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async create(order: IOrder): Promise<Order> {
    try {
      return await Order.create<Order>(order as any);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Order
   */
  async findById(id: string): Promise<Order | null> {
    try {
      const orderItem = await Order.findByPk(id);
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @orderNo
   * returns Order
   */
  async findByOrderNo(orderNo: string): Promise<Order | null> {
    try {
      const orderItem = await Order.findOne({ where: { orderNo } });
      return orderItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Order
   */
  async getAll(): Promise<Order[]> {
    try {
      const categories = await Order.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Order as parameter
   * @order
   * returns void
   */
  async update(order: IOrder): Promise<Order> {
    const {
      id,
      userId,
      productId,
      unitPrice,
      total,
      status,
      orderNo,
    } = order;
    try {
      const orderItem: any = await Order.findByPk(id);
      return await orderItem?.update({
        id,
        userId,
        productId,
        unitPrice,
        total,
        status,
        orderNo,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const orderItem = await Order.findByPk(id);
      await orderItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
