import Axios from 'axios';

import { HttpRequestAxiosService } from './http-axios.service';

export class HttpRequestService extends HttpRequestAxiosService {
  constructor(baseURL) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.timeout = 10 * 60 * 1000; // 10 minutes
  }
}
