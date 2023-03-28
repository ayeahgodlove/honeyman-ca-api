import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany,
  HasMany
} from "sequelize-typescript";
import { Product } from "./product";
import { User } from "./user";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "order",
  modelName: "Order"
})
export class Order extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  })
  @ForeignKey(() => Product)
  productId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalQtty!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total!: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    unique: true,
  })
  orderNo!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product
}