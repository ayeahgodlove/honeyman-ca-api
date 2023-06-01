import { Table, Model, Column, DataType, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Product } from "./product";
import { User } from "./user";
import { IReview } from "../../domain/models/review";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "review",
  modelName: "Review"
})
export class Review extends Model<IReview> {
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
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating!: number;

  @BelongsTo(() => Product)
  product!: Product

  @BelongsTo(() => User)
  user!: User;
}