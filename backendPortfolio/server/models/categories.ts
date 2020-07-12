import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Categories extends Model<Categories> {
  @Column
  name: string;

  @Column
  code: number;
}
