import { User } from '../models/user.model';
import { Router, Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';
import { auth } from '../auth/jwt';
import * as passport from 'passport';
import { RouterBase } from './base/router.base';
import { UserService } from '../services/user.service';

require('dotenv').config();

export const UserController = () => {
  const router = Router();

  const { all, findOne, remove, update } = RouterBase<User>(User, UserService);

  const create = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const check = await User.findOne({ where: { email } });

      if (check) {
        return res.status(400).end('This e-mail is already being used.');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassowrd = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassowrd,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(400).send('Email or Password is invalid');

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass)
        return res.status(400).send('Email or Password is invalid');

      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_TOKEN as string
      );

      return res.header('auth-token', token).send(token);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  router.post('/', create);
  router.get('/', auth, all);
  router.get('/:id', findOne);
  router.delete('/:id', remove);
  router.put('/:id', update);
  router.post('/login', login);

  return router;
};
