import { Model, Table, Column, HasMany } from 'sequelize-typescript';

import { Post } from './post.model';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Post)
  post: Post[];
}
