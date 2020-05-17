import {
  Model,
  Table,
  ForeignKey,
  Column,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Post extends Model<Post> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column
  title: string;

  
  @Column
  content: string
}
