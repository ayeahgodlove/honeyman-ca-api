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
import { Category } from "./category";
import { Order } from "./order";
import { SubCategory } from "./sub-category";
import { uuid } from "uuidv4";
import { ProductImage } from "./product-image";
import { Review } from "./review";
import { IProduct } from "../../domain/models/product";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "product",
  modelName: "Product"
})
export class Product extends Model<IProduct> {
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
  shortDescription!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  description!: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    unique: true,
  })
  quantity!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  slug!: string;

  // one-to-many relationships
  @HasMany(() => ProductImage)
  productImages!: ProductImage[]

  @HasMany(() => Review)
  reviews!: Review[]

  @HasMany(() => Order)
  orders!: Order[]

  // one-to-one relationships
  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;
}