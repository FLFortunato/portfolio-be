import {Model, Table, Column} from 'sequelize-typescript'

@Table
export class Company extends Model<Company>{


    @Column
    compName : string

    @Column
    content: string

    @Column
    compContact: string

    @Column
    compStatus: number
}