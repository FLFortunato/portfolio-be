import axios, {AxiosResponse} from 'axios';

export default class HttpService {
  static instance: any;
  static baseURL = 'http://localhost:8002/api';

  static getInstance() {
    if (HttpService.instance) return HttpService.instance;

    const config = {
      baseURL: HttpService.baseURL,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    HttpService.instance = axios.create(config);

    return HttpService.instance;
  }

  static get<T>(url: string, params?: any): Promise<AxiosResponse<T>>{
    const instance = HttpService.getInstance();
    return instance.get(url, { params });
  }

  static put(url: string, data: any) {
    const instance = HttpService.getInstance();
    return instance.put(url, data);
  }

  static post<T>(url:string, data:any):Promise<AxiosResponse<T>>{
    const instance = HttpService.getInstance();
    return instance.post(url, data);
  }

  static delete(url: string):Promise<AxiosResponse<any>> {
    const instance = HttpService.getInstance();
    return instance.delete(url);
  }
}
