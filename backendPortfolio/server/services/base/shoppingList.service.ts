import { BaseService } from './base.service';
import { ShoppingList } from '../../models/shoppingList';

export const ShoppingListService = () => {
  const { all, remove, update, create, findOne } = BaseService(ShoppingList);

  return { all, remove, update, create, findOne };
};
