import { BaseService } from './base/base.service';
import { Categories } from '../models/categories';

export const CategoriesService = () => {
  const { create, all, findOne, remove, update } = BaseService(Categories);

  return { create, all, findOne, remove, update };
};
