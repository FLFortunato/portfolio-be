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
      html: req.body.text, // plain text bodyhtml: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        res.status(200).send('E-mail sent');
      }
    });
  };

  router.post('/', sendEmail);

  return router;
};
