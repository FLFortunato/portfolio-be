import * as jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access denied...');

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN as string);
    req.body = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }

  return;
};
