import { IBaseResponse } from "./base-response";

export interface IOrder {
  id: string;
  userId: string;
  productId: string;
  unitPrice: number;
  total: number;
  status: string;
  orderNo: string;
}

export const emptyOrder: IOrder = {
  id: "",
  userId: "",
  productId: "",
  unitPrice: 0,
  total: 0,
  status: "",
  orderNo: "",
};

export interface IOrderResponse extends IBaseResponse {
  data: IOrder | null;
}
