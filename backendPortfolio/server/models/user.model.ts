import { Table, Model, Column, AllowNull, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  name: string;

  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  emailConfirmed: boolean;

  @Column
  street: string;

  @Column
  neighborhood: string;

  @Column
  cep: string;

  @Column
  number: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  complement: string;
}
