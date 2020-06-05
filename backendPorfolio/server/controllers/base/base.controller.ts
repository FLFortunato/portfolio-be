import { Model } from 'sequelize-typescript';
import * as HttpStatus from 'http-status-codes';
import { BaseServiceModel } from '../../services/base/base.service';
import { Response, Request } from 'express';
import * as Chalk from 'chalk';

export const RouterBase = <T>(
  model: (new () => T) & typeof Model,
  service: BaseServiceModel
) => {
  const all = async (req: Request, res: Response) => {
    try {
      const BaseService = service<T>(model);
      const result = await BaseService.all();

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(Chalk.redBright('ALL ERROR ==>', error));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  };

  const findOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const baseService = service<T>(model);
      const result = await baseService.findOne(parseInt(id as string));
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(Chalk.redBright(' GETONE ERROR ==>'), error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  const create = async (req: Request, res: Response) => {
    try {
      const baseService = service<T>(model);
      const result = await baseService.create(<Object>req.body);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(Chalk.redBright(' CREATE ERROR ==>'), error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  const update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const baseService = service<T>(model);
      const result = await baseService.update(
        parseInt(id as string),
        <Object>req.body
      );
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(Chalk.redBright(' UPDATE ERROR ==>'), error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  const remove = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const baseService = service<T>(model);
      await baseService.remove(parseInt(id as string));
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      console.log(Chalk.redBright(' REMOVE ERROR ==>'), error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  };

  return { all, findOne, create, update, remove };
};