import { User } from '../models/user.model';
import { Router, Request, Response } from 'express';
import { RouterBase } from './base/base.controller';
import { UserService } from '../services/user.service';
import * as HttpStatus from 'http-status-codes';
import * as Chalk from 'chalk';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { auth } from '../auth/jwt';
dotenv.config();

export const UserController = () => {
  const router = Router();

  const { all, remove, update, findOne } = RouterBase(User, UserService);

  const create = async (req: Request, res: Response) => {
    const config = {
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
        user: 'flf.2008brasil@hotmail.com',
        pass: process.env.PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);
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
        cep,
        city,
        complement,
        lastName,
        neighborhood,
        number,
        state,
        street,
      });

      const token = jwt.sign(
        { id: result.id },
        process.env.SECRET_TOKEN as string,
        {
          expiresIn: 600,
        }
      );
      const message = {
        from: 'flf.2008brasil@hotmail.com', // sender address
        to: result.email, // list of receivers
        subject: 'Confirmação de conta', // Subject line
        html: `<h1> Confirme a sua conta acessando o link  </h1> <a href='http://localhost:5052/api/user/emailconfirmation/${token}'> Clique aqui...</a> `, // plain text bodyhtml: "<b>Hello world?</b>", // html body
      };

      transporter.sendMail(message, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).end();
        } else {
          res.status(200).send('E-mail sent');
        }
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
      const id = await jwt.verify(
        token,
        process.env.SECRET_TOKEN as string,
        (e, d: any) => {
          return d.id;
        }
      );
      const UserID = id as any;

      const updateUser = await User.update(
        { emailConfirmed: true },
        { where: { id: UserID } }
      );
      return res.redirect('http://localhost:3000/login');
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
  router.put('/updateProfile/:id', upDateProfile);
  router.get('/emailconfirmation/:token', emailConfirmation);

  return router;
};
