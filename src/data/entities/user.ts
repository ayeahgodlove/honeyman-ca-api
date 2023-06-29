import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Order } from "./order";
import { IUser } from "../../domain/models/user";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "user",
  modelName: "User"
})
export class User extends Model<IUser> {
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
  username!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  firstname!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  lastname!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    unique: true,
  })
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  address!: string;
  
  @Column({
    type: DataType.STRING(13),
  })
  phoneNumber!: string;

  @HasMany(() => Order)
  order!: Order[];
}