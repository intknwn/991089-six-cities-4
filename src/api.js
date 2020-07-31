import axios from 'axios';

const Error = {
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const createAPI = (onError) => {
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

    if (response.status === Error.INTERNAL_ERROR || Error.SERVICE_UNAVAILABLE) {
      onError(response.data.error);

      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
