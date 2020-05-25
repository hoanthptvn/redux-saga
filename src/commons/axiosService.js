import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handlerSuccess, this.handlerError);
    this.instance = instance;
  }

  handlerSuccess(response) {
    return response;
  }

  handlerError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }
}

export default new AxiosService();
