import { Model } from 'sequelize-typescript';

export const BaseService = <T>(model: (new () => T) & typeof Model) => {
  const all = async () => {
    const result = await model.findAll();

    return result;
  };

  const findOne = async (id: number) => {
    const result = await model.findOne({ where: { id } });
    return result;
  };

  const create = async (data: any) => {
    const result = await model.create(data as Object);
    return result;
  };

  const update = async (id: number, data: any) => {
    const result = await model.update(data as Object, { where: { id } });
    return result;
  };

  const remove = async (id: number) => {
    const result = await model.destroy({ where: { id } });
    return result;
  };

  return { all, findOne, create, update, remove };
};

export type BaseServiceModel = typeof BaseService;
