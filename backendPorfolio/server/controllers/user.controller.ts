import { User } from '../models/user.model';
import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { UserService } from '../services/user.service';
import * as HttpStatus from 'http-status-codes';
import * as Chalk from 'chalk';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { auth } from '../auth/jwt';
import * as jwt from 'jsonwebtoken';

export const UserController = () => {
  const router = Router();

  const { all, update, remove, findOne } = RouterBase(User, UserService);

  const create = async (req: Request, res: Response) => {
    try {
      const { name, password, email } = req.body;
      const check = await User.findOne({
        where: {
          email,
        },
      });

      if (check) {
        return res.status(400).send('Email is being used already.');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const result = await User.create({
        name: name,
        password: hashedPass,
        email: email,
      });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const findAll = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await User.findAll({
        where: {
          name: {
            [Op.iLike]: `%${id}%`,
          },
        },
      });
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(Chalk.redBright(' GETONE ERROR ==>'), error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send('E-mail not found');
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(400).send('Incorrect password');
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.SECRET_TOKEN as string
      );

      return res.header('auth-token', token).send({ token, user });
    } catch (error) {
      return error;
    }
  };
  router.post('/', create);
  router.get('/:id', findOne);
  router.get('/', all);
  router.delete('/:id', remove);
  router.put('/:id', update);
  router.get('/name/:id', findAll);
  router.post('/login', login);

  return router;
};
