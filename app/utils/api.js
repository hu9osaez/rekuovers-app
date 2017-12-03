import { API_ENDPOINT } from './constants';

const postParameters = (body) => ({
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body)
});

export const postSignIn = (body) => {
  const SIGNIN_ENDPOINT = `${API_ENDPOINT}/auth/login`;

  return fetch(SIGNIN_ENDPOINT, postParameters(body)).then(res => res.json());
};
