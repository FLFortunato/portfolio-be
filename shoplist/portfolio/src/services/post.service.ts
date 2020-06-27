import { BaseService } from './base/base.service';
import { AxiosResponse } from 'axios';
import { HttpService } from './http.service';

export const PostServices = () => {
  const { get, remove, update } = BaseService('posts');

  const create = (data: any, id: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(`posts/${id}`, data);
  };

  return { get, remove, update, create };
};
