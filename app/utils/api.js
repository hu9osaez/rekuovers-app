import { API_ENDPOINT } from './constants';

const postParameters = (body) => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body)
});

export const postLogin = (body) => {
  return fetch(`${API_ENDPOINT}/auth/login`, postParameters(body)).then(res => res.json());
};
