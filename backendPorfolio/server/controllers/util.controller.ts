import { Router, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import { newContactHtml } from '../util/emailContact';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
dotenv.config();

export const EmaiController = () => {
  const router = Router();

  const config = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
      user: 'flf.2008brasil@hotmail.com',
      pass: process.env.PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const sendEmail = async (req: Request, res: Response) => {
    const message = {
      from: '"flf.2008brasil@hotmail.com"', // sender address
      to: 'flf.2008brasil@hotmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plain text bodyhtml: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        console.log('DEU CERTO');
        res.status(200).send('E-mail sent');
      }
    });
  };

  const sendEmailConfirmation = async (req: Request, res: Response) => {
    const { email } = req.body;

    const userId = await User.findOne({ where: { email } });

    const token = jwt.sign(
      { id: userId.id },
      process.env.SECRET_TOKEN as string
    );
    const message = {
      from: 'flf.2008brasil@hotmail.com', // sender address
      to: 'flf.2008brasil@hotmail.com', // list of receivers
      subject: 'Confirmação de conta', // Subject line
      html: `<h1> Confirme a sua conta acessando o link  </h1> <a href='http://localhost:3000/confirmation/${token}'> Clique aqui...</a> `, // plain text bodyhtml: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        console.log('DEU CERTO');
        res.status(200).send('E-mail sent');
      }
    });
  };

  router.post('/', sendEmail);
  router.post('/confirmation', sendEmailConfirmation);

  return router;
};
