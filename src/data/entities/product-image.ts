import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Product } from "./product";
import { IProductImage } from "../../domain/models/product-image";

// shortDescription: string;

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "product_image",
  modelName: "ProductImage"
})
export class ProductImage extends Model<IProductImage> {
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
      model: Product,
      key: "id",
    },
  })
  @ForeignKey(() => Product)
  productId!: string; 

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  url!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  shortDescription!: string;

  @BelongsTo(() => Product)
  products!: Product
}