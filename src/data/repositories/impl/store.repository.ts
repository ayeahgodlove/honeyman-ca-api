import { Store } from "../../entities/store";
import { IStore } from "../../../domain/models/store";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IStoreRepository } from "../contracts/istore.repository";

export class StoreRepository implements IStoreRepository {
  /**
   *
   */
  constructor() {}

  /**
   * Receives a Store as parameter
   * @store
   * returns void
   */
  async create(store: IStore): Promise<Store> {
    try {
      return await Store.create<Store>({ ...store });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Store
   */
  async findById(id: string): Promise<Store | null> {
    try {
      const storeItem = await Store.findByPk(id);

      if (!storeItem) {
        throw new NotFoundException("Store", id);
      }
      return storeItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns Store
   */
  async findByName(name: string): Promise<Store | null> {
    try {
      const storeItem = await Store.findOne({ where: { name } });
      return storeItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Store
   */
  async getAll(): Promise<Store[]> {
    try {
      const categories = await Store.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Store as parameter
   * @store
   * returns void
   */
  async update(store: IStore): Promise<Store> {
    const { id } = store;
    try {
      const storeItem: any = await Store.findByPk(id);

      console.log(store);
      if (!storeItem) {
        throw new NotFoundException("Store", id.toString());
      }

      return await storeItem?.update({ ...store });
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
      const storeItem = await Store.findByPk(id);

      if (!storeItem) {
        throw new NotFoundException("Store", id);
      }

      await storeItem?.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
