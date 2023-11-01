import axios from 'axios';
import { ApiRequest } from './types';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 25000000;

export const getRequest = async ({ endpoint, headers }: ApiRequest) => {
  try {
    let response: any;

    if (headers) {
      response = await axios.request({
        url: endpoint,
        method: 'GET',
        headers,
      });
    } else {
      response = axios.get(endpoint);
    }

    return response;
  } catch (e: any) {
    console.error(`${e.response.status} ${JSON.stringify(e.response.data)}`);
    throw new Error(e.response);
  }
};

export const postRequest = async ({ endpoint, data, headers }: ApiRequest) => {
  try {
    let response: any;

    if (headers) {
      response = await axios.request({
        url: endpoint,
        method: 'POST',
        data,
        headers,
      });
    } else {
      response = await axios.post(endpoint, data);
    }
    return response;
  } catch (e: any) {
    console.error(`${e.response.status} ${JSON.stringify(e.response.data)}`);
    throw new Error(e.response);
  }
};
