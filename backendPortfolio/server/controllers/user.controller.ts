import { User } from '../models/user.model';
import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { UserService } from '../services/user.service';
import * as HttpStatus from 'http-status-codes';
import * as Chalk from 'chalk';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { auth } from '../auth/jwt';
dotenv.config();

export const UserController = () => {
  const router = Router();

  const { all, remove, update, findOne } = RouterBase(User, UserService);

  const create = async (req: Request, res: Response) => {
    try {
      const {
        name,
        password,
        email,
        cep,
        city,
        complement,
        lastName,
        neighborhood,
        number,
        state,
        street,
      } = req.body;
      const result = await UserService()
        .create({
          name,
          password,
          email,
          cep,
          city,
          complement,
          lastName,
          neighborhood,
          number,
          state,
          street,
        })
        .then((response) => {
          return response;
        })
        .catch((e) => {
          return e;
        });

      return res.status(200).json(result);
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await UserService()
        .login(email, password)
        .then((response) => {
          return response;
        })
        .catch((e) => {
          console.log(e);
        });

      return res.json(result).send(result);
    } catch (error) {
      return error;
    }
  };

  const upDateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        cep,
        city,
        complement,
        lastName,
        neighborhood,
        number,
        state,
        street,
      } = req.body;
      const salt = await bcrypt.genSalt(10);

      const result = await User.update(
        {
          name,
          email,
          cep,
          city,
          complement,
          lastName,
          neighborhood,
          number,
          state,
          street,
        },
        { where: { id } }
      );

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  const emailConfirmation = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const result = await UserService().emailConfirmation(token);

      return res.redirect('http://localhost:3000');
    } catch (error) {
      return error;
    }
  };

  const forgotPass = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await UserService()
        .forgotPass(email)
        .then(() => {
          res.sendStatus(200).send('Deu certo');
        });

      return res.json(result);
    } catch (error) {
      return error;
    }
  };

  const resetPass = async (req: Request, res: Response) => {
    try {
      const { password, token } = req.body;

      const result = await UserService().resetPass(password, token);

      return result;
    } catch (error) {
      return res.sendStatus(404);
    }
  };
  router.post('/', create);
  router.get('/:id', findOne);
  router.get('/', all);
  router.delete('/:id', remove);
  router.put('/:id', update);
  router.get('/name/:id', findAll);
  router.post('/login', login);
  router.put('/updateProfile/:id', upDateProfile);
  router.get('/emailconfirmation/:token', emailConfirmation);
  router.post('/forgotPass/pass', forgotPass);
  router.put('/resetpass/pass', resetPass);

  return router;
};
