import axios from 'axios';

const buildAPIConfig = (api, method, headers = null) => {
  let config = {
    url: api,
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (headers) config.headers = { ...config.headers, ...headers };
  if (headers?.responseType) config.responseType = headers.responseType;
  return config;
};

const callAPI = (api, payload = null, method, headers = null) => {
  const config = buildAPIConfig(api, method, headers);
  if (payload) {
    if (method === 'get') config.params = payload;
    else config.data = payload;
  }
  
  return axios(config)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      res.status(500).json({ error: 'Fetching error!' });
    });

};

export const get = (api, params = null, headers = null) => {
  return callAPI(api, params, 'get', headers);
};

export const post = (api, body = null, headers = null) => {
  return callAPI(api, body, 'post', headers);
};

export const put = (api, body = null, headers = null) => {
  return callAPI(api, body, 'put', headers);
};

export const remove = (api, body = null, headers = null) => {
  return callAPI(api, body, 'delete', headers);
};
