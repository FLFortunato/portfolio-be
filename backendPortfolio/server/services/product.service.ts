import { BaseService } from './base/base.service';
import { Products } from '../models/products';
import { Op } from 'sequelize';

export const ProductsService = () => {
  const { all, findOne, remove, update } = BaseService(Products);

  const create = async ({ id, cat, name, price, qtd }: any) => {
    try {
      const result = await Products.create({
        userId: id,
        category: cat,
        name: name,
        price: price,
        qtd: qtd,
        total: price * qtd,
      });

      return result;
    } catch (error) {
      return error;
    }
  };

  const findByCategory = async (id: any, userid: any, data: any) => {
    try {
      const result = await Products.findAll({
        where: {
          category: id,
          userId: userid,
          name: { [Op.iLike]: `%${data}%` },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const findByUserId = async (userId: number) => {
    try {
      const result = await Products.findAll({ where: { userId } });

      return result;
    } catch (error) {
      return error;
    }
  };

  return { all, create, findOne, remove, findByCategory, findByUserId, update };
};
