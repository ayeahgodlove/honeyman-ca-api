import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { IStore } from "../../domain/models/store";
import { Product } from "./product";
import { Branch } from "./branch";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "store",
  modelName: "Store",
})
export class Store extends Model<IStore> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  imageBannerUrl!: string;

  // relationships
  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => Branch)
  branches!: Branch[];
}
