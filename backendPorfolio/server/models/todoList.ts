import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class TodoList extends Model<TodoList> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column
  content: string;
}
