import { BaseService } from './base.service';
import { TodoList } from '../../models/todoList';

export const TodoService = () => {
  const { all, create, findOne, remove, update } = BaseService(TodoList);

  return { all, create, findOne, remove, update };
};
