import axios from 'axios';

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

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();

      throw err;
    }

    if (response.status === Error.INTERNAL_ERROR || Error.SERVICE_UNAVAILABLE || Error.BAD_REQUEST) {
      onError(response.data.error);

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
