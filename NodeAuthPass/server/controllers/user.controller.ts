import { User } from "../models/user.model";
import { Router, Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");
import * as jwt from 'jsonwebtoken'
import {auth} from '../auth/jwt'
import * as passport from 'passport'


require('dotenv').config()

export const UserController = () => {
  const router = Router();

  const create = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const check = await User.findOne({ where: { email } });

    if (check) {
      return res.status(400).end("This e-mail is already being used.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const user = await User.create({ name: name, email: email, password: hashedPassowrd });

    return res.status(201).json(user);
  };

  const findAll = async (req: Request, res: Response) => {
    const users = await User.findAll();

    return res.status(200).json(users);
  };

  const findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) return res.status(404).end();
    return res.status(200).json(user);
  };

  const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteUser = await User.destroy({ where: { id } });

    if (!deleteUser) {
      return res.status(404).end();
    }

    return res.status(200);
  };

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateUser = await User.update(
      { name, email, password },
      { returning: true, where: { id } }
    );

    return res.status(200).json(updateUser);
  };

  const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).send("Email or Password is invalid e");

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.status(400).send("Email or Password is invalid");


    const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN as string)

    return res.header('auth-token', token).send(token) ;
  };


  

  router.post("/", create);
  router.get("/", auth, findAll);
  router.get("/:id", findOne);
  router.delete("/:id", deleteOne);
  router.put("/:id", update);
  router.post("/login", login);

  return router;
};
