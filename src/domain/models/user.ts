import { IBaseResponse } from "./base-response";

export interface IUser {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}

export const emptyUser: IUser = {
  id: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  address: "",
  phoneNumber: "",
};

export interface IUserResponse extends IBaseResponse {
  data: IUser | null | IUser[];
  token?: string;
}
