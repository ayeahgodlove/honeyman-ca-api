import { Payment } from "../../entities/payment";
import { IPaymentRepository } from "../contracts/ipayment.repository";
import { IPayment } from "../../../domain/models/payment";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";

export class PaymentRepository implements IPaymentRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Payment as parameter
   * @payment
   * returns void
   */
  async create(payment: IPayment): Promise<Payment> {
    try {
      return await Payment.create<Payment>(payment as any);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Payment
   */
  async findById(id: string): Promise<Payment | null> {
    try {
      const paymentItem = await Payment.findByPk(id);
      if (!paymentItem) {
        throw new NotFoundException("Payment", id);
      }
      return paymentItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Payment
   */
  async findByOrderId(orderId: string): Promise<Payment | null> {
    try {
      const paymentItem = await Payment.findOne({ where: { orderId } });
      if (!paymentItem) {
        throw new NotFoundException("Payment", orderId);
      }
      return paymentItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Payment
   */
  async getAll(): Promise<Payment[]> {
    try {
      const categories = await Payment.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Payment as parameter
   * @payment
   * returns void
   */
  async update(payment: IPayment): Promise<Payment> {
    const { id } = payment;
    try {
      const paymentItem: any = await Payment.findByPk(id);
      if (!paymentItem) {
        throw new NotFoundException("Payment", id);
      }
      return await paymentItem?.update(payment);
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
      const paymentItem = await Payment.findByPk(id);
      if (!paymentItem) {
        throw new NotFoundException("Payment", id);
      }
      await paymentItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
