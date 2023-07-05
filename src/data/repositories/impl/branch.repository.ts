import { Branch } from "../../entities/branch";
import { IBranch } from "../../../domain/models/branch";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IBranchRepository } from "../contracts/ibranch.repository";

export class BranchRepository implements IBranchRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Branch as parameter
   * @branch
   * returns void
   */
  async create(branch: IBranch): Promise<Branch> {
    try {
      return await Branch.create<Branch>({ ...branch });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Branch
   */
  async findById(id: string): Promise<Branch | null> {
    try {
      const branchItem = await Branch.findByPk(id);

      if (!branchItem) {
        throw new NotFoundException("Branch", id);
      }
      return branchItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Branch
   */
  async findByName(name: string): Promise<Branch | null> {
    try {
      const branchItem = await Branch.findOne({ where: { name } });
      return branchItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Branch
   */
  async getAll(): Promise<Branch[]> {
    try {
      const categories = await Branch.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Branch as parameter
   * @branch
   * returns void
   */
  async update(branch: IBranch): Promise<Branch> {
    const { id } = branch;
    try {
      const branchItem: any = await Branch.findByPk(id);

      console.log(branch);
      if (!branchItem) {
        throw new NotFoundException("Branch", id.toString());
      }

      return await branchItem?.update({ ...branch });
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
      const branchItem = await Branch.findByPk(id);

      if (!branchItem) {
        throw new NotFoundException("Branch", id);
      }

      await branchItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
