import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Category } from "./category";
import { Product } from "./product";
import { ISubCategory } from "../../domain/models/category";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "sub_category",
  modelName: "SubCategory"
})
export class SubCategory extends Model<ISubCategory> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  declare id?: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  })
  categoryId!: string;
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

  /**
   * Rav4 => Cars (belongs to)
   */
  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Product)
  products!: Product[];
}