import axios from 'axios';
import {notify} from 'react-notify-toast';

const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const createAPI = (onError, onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (!response) {
      notify.show(`Возникла непредвиденная ошибка: ${err.message}`, `error`);
      throw err;
    }

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized(response.config);

      throw err;
    }

    switch (response.status) {
      case Error.INTERNAL_ERROR:
      case Error.SERVICE_UNAVAILABLE:
      case Error.BAD_REQUEST:
        onError(response.data.error);
        throw err;
      default:
        notify.show(`Возникла непредвиденная ошибка: ${err.message}`, `error`);
        throw err;
    }

  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
