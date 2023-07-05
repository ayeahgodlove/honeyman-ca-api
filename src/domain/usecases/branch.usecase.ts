import { Branch } from "../../data/entities/branch";
import { IBranchRepository } from "../../data/repositories/contracts/ibranch.repository";
import { IBranch } from "../models/branch";
export class BranchUseCase {
  /**
   *
   */
  constructor(private readonly branchRepository: IBranchRepository) {}

  async createBranch(branch: IBranch): Promise<Branch> {
    const existingBranch = await this.branchRepository.findByName(
      branch.name
    );

    if (existingBranch) {
      throw new Error("Branch already exists");
    }

    // const _branch = new Branch({branch});
    //because it's already done in the Repository
    return this.branchRepository.create(branch);
  }

  async getAll(): Promise<Branch[]> {
    return this.branchRepository.getAll();
  }

  async getBranchById(id: string): Promise<Branch | null> {
    return this.branchRepository.findById(id);
  }

  async updateBranch(branch: IBranch): Promise<Branch> {
    return this.branchRepository.update(branch);
  }

  async deleteBranch(id: string): Promise<void> {
    return this.branchRepository.delete(id);
  }
}
