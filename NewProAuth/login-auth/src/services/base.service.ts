import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import { HttpService } from './http.service';
export const BaseService = (url: string) => {
  const get = () => {
    return HttpService().get(url);
  };

  const save = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(url, data);
  };

  const update = (id: number, data: any): Promise<AxiosResponse<any>> => {
    return HttpService().put(`${url}/${id}`, data);
  };

  const getById = (id: number | string): Promise<AxiosResponse<any>> => {
    return HttpService().get(`${url}/${id}`);
  };

  const remove = (id: number): Promise<AxiosResponse<any>> => {
    return HttpService().remove(`${url}/${id}`);
  };

  const login = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().post(`${url}/login`, data);
  };

  const checkEmail = (data: any): Promise<AxiosResponse<any>> => {
    return HttpService().get(`${url}/emailcheck`, data);
  };

  return { get, save, login, checkEmail, update, getById, remove };
};
