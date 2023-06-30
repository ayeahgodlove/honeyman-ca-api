import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product";
import { SubCategory } from "./sub-category";
import { ICategory } from "../../domain/models/category";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "category",
  modelName: "Category"
})
export class Category extends Model<ICategory> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  // category can have one-or-many subcategories
  /**
   *  category: Car
   * subCategory: Suff, Rav4, Land Cruiser etc...
   */
  @HasMany(() => SubCategory)
  sub_categories!: SubCategory[];

  @HasMany(() => Product)
  products!: Product[];
}
