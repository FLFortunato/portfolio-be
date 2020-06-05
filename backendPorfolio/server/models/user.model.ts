import { Table, Model, Column, AllowNull } from 'sequelize-typescript';

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
}
