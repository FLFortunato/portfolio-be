import {
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  Column,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Post extends Model<Post> {
  @ForeignKey(() => User)
  userPostId: Number;

  @BelongsTo(() => User)
  user: User;

  @Column
  title: string;

  @Column
  type: number;

  @Column
  content: string;

  @Column
  writenBy: string;
}
