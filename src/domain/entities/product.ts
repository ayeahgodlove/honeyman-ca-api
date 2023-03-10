import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  BelongsToMany
} from "sequelize-typescript";
import { Category } from "./category";
import { Order } from "./order";
import { ProductOrder } from "./product-order";
import { SubCategory } from "./sub-category";
import { uuid } from "uuidv4";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Products",
  modelName: "Product"
})
export class Product extends Model {
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
      model: Category,
      key: "id",
    },
  })
  @ForeignKey(() => Category)
  categoryId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: SubCategory,
      key: "id",
    },
  })
  @ForeignKey(() => SubCategory)
  subCategoryId!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  description!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  imagePath!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders!: Order[];
}