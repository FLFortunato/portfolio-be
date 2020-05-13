import { NextFunction, Response } from 'express';
interface Request {
    user: {};
    header: any;
}
export declare const auth: (req: Request, res: Response<any>, next: NextFunction) => Response<any> | undefined;
export {};
