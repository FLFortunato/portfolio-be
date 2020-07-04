import { BaseService } from './base/base.service';
import { User } from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { auth } from '../auth/jwt';
import * as bcrypt from 'bcrypt';

dotenv.config();

type Props = {
  name: string;
  password: string;
  email: string;
  cep: string;
  city: string;
  complement: string;
  lastName: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
};
export const UserService = () => {
  const { all, findOne, remove, update } = BaseService(User);

  const config = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
      user: 'flf.2008brasil@hotmail.com',
      pass: process.env.PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const create = async ({
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
  }: Props) => {
    const check = await User.findOne({
      where: {
        email,
      },
    });

    if (check) {
      throw 'Email is being used already.';
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
        expiresIn: 3600,
      }
    );
    const message = {
      from: 'flf.2008brasil@hotmail.com',
      to: result.email,
      subject: 'Confirmação de conta',
      html: `<h1> Confirme a sua conta acessando o link  </h1> <a href='http://localhost:5052/api/user/emailconfirmation/${token}'> Clique aqui...</a> `, // plain text bodyhtml: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        return error;
      } else {
        return 'E-mail sent';
      }
    });

    return result;
  };

  const login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw 'E-mail not found';
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw 'Incorrect password';
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN as string);

    return { token, user };
  };

  const forgotPass = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return 'Email not found';

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.SECRET_TOKEN as string,
      {
        expiresIn: 600,
      }
    );

    const message = {
      from: 'flf.2008brasil@hotmail.com',
      to: email,
      subject: 'Configurar nova senha',
      html: `<h1> Para configurar uma nova senha, acesse o link ao lado <a href='http://localhost:3000/resetarsenha/${resetToken}'> <button> Clique aqui </button> </a> </h1>`, // plain text bodyhtml: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        return resetToken;
      }
    });
    return resetToken;
  };

  const resetPass = async (password: string, token: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const id = await jwt.verify(
      token,
      process.env.SECRET_TOKEN as string,
      (e: any, d: any) => {
        return d.id;
      }
    );

    const UserID = id as any;

    const updateUser = await User.update(
      { password: hashedPass },
      { where: { id: UserID } }
    );

    return updateUser;
  };

  const emailConfirmation = async (token: string) => {
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

    return updateUser;
  };

  return {
    all,
    create,
    findOne,
    remove,
    update,
    resetPass,
    login,
    forgotPass,
    emailConfirmation,
  };
};
