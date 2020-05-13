import { Model } from 'sequelize-typescript';
export declare class Company extends Model<Company> {
    compName: string;
    content: string;
    compContact: string;
    compStatus: number;
}
