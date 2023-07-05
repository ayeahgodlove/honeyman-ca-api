import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { IBranch } from "../../domain/models/branch";
import { Store } from "./store";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "branch",
  modelName: "Branch",
})
export class Branch extends Model<IBranch> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => Store) // foreign key
  @Column
  storeId!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  town!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address!: string;

  @BelongsTo(() => Store, "storeId")
  store!: Store;
}
