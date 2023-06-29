import { IBaseResponse } from "./base-response";

export interface IProduct {
  id: string;
  name: string;
  amount: number;
  shortDescription: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  quantity: string;
}

export const emptyProduct: IProduct = {
  id: "",
  name: "",
  amount: 0,
  shortDescription: "",
  description: "",
  categoryId: "",
  subCategoryId: "",
  quantity: "",
};

export interface IProductResponse extends IBaseResponse {
  data: IProduct | null | IProduct[];
}
