import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import HttpService from './http.service';

export abstract class BaseService<T> {
  url: string;

  constructor(url: any) {
    this.url = url;
  }

  public get(): Promise<AxiosResponse<T>> {
    return HttpService.get(this.url);
  }

  public save(data: T): Promise<AxiosResponse<T>> {
    return HttpService.post(this.url, data);
  }

  public update(id: number, data: T): Promise<AxiosResponse<T>> {
    return HttpService.put(`${this.url}/${id}`, data);
  }

  public getById(id: number | string): Promise<AxiosResponse<T>> {
    return HttpService.get(`${this.url}/${id}`);
  }

  public delete(id: number): Promise<AxiosResponse<any>> {
    return HttpService.delete(`${this.url}/${id}`);
  }

  public login(data: any): Promise<AxiosResponse<any>> {
    return HttpService.post(`${this.url}/login`, data);
  }
}
