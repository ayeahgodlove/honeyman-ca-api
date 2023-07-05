import { Branch } from "../../entities/branch";
import { IBranch } from "../../../domain/models/branch";

export interface IBranchRepository {
    create(branch: IBranch): Promise<Branch>;
    findById(id: string): Promise<Branch | null>;
    findByName(name: string): Promise<Branch | null>;
    getAll(): Promise<Branch[]>;
    update(branch: IBranch): Promise<Branch>;
    delete(id: string): Promise<void>;
  }