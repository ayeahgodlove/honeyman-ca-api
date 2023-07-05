import { IBaseResponse } from "./base-response";

export interface IBranch {
  id: string;
  name: string;
  town: string;
  address: string;
}

export const emptyBranch: IBranch = {
  id: "",
  name: "",
  address: "",
  town: ""
};

export interface IBranchResponse extends IBaseResponse {
  data: IBranch | null | IBranch[];
}
