import { IBaseResponse } from "./base-response";

export interface IPayment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  status: string;
}

export const emptyPayment: IPayment = {
  id: "",
  userId: "",
  orderId: "",
  amount: 0,
  status: "",
};

export interface IPaymentResponse extends IBaseResponse {
  data: IPayment | null | IPayment[];
}
