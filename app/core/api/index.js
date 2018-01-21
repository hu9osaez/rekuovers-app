export const API_URL = 'http://api.rekuovers.com';

const authParameters = (body) => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
});

export const postLogin = (body) => {
  return fetch(`${API_URL}/auth/login`, authParameters(body)).then(res => res.json());
};
