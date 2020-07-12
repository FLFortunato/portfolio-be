import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Categories } from './categories';
import { User } from './user.model';

@Table
export class Products extends Model<Products> {
  @ForeignKey(() => Categories)
  category: number;

  @BelongsTo(() => Categories)
  categories: Categories;

  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  name: string;

  @Column(DataType.DOUBLE)
  price: number;

  @Column
  qtd: number;

  @Column(DataType.DOUBLE)
  total: number;
}
