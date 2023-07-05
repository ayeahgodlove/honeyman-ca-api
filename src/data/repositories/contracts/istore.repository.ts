import { Store } from "../../entities/store";
import { IStore } from "../../../domain/models/store";

export interface IStoreRepository {
    create(store: IStore): Promise<Store>;
    findById(id: string): Promise<Store | null>;
    findByName(name: string): Promise<Store | null>;
    getAll(): Promise<Store[]>;
    update(store: IStore): Promise<Store>;
    delete(id: string): Promise<void>;
  }