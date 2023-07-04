import { IBaseResponse } from "./base-response";

export interface IProductImage {
  id: string;
  productId: string;
  name: string;
  url: string;
  shortDescription: string;
}

export const emptyProductImage: IProductImage = {
    id: "",
    productId: "",
    name: "",
    url: "",
    shortDescription: "",
};

export interface IProductImageResponse extends IBaseResponse {
  data: IProductImage | null | IProductImage[];
  token?: string
}
