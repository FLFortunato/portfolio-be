import {
  Table,
  Model,
  ForeignKey,
  Column,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class ShoppingList extends Model<ShoppingList> {
  @ForeignKey(() => User)
  @Column
  UserId: Number;

  @BelongsTo(() => User)
  user: User;

  @Column
  item: string;

  @Column
  qtd: number;

  @Column(DataType.FLOAT)
  price: number;
}
