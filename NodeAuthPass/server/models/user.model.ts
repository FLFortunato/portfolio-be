import { Model, Table, Column, HasMany, AllowNull } from 'sequelize-typescript';

import { Post } from './post.model';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => Post)
  post: Post[];
}
