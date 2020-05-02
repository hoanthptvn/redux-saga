import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create();
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
}

export default new AxiosService();
