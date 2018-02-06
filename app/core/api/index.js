export const API_URL = 'http://rekuovers.com/api';

const authParameters = body => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const postLogin = body => {
  return fetch(`${API_URL}/auth/login`, authParameters(body)).then(res =>
    res.json()
  );
};

export const postSignup = body => {
  return fetch(`${API_URL}/auth/signup`, authParameters(body)).then(res =>
    res.json()
  );
};

export const refreshToken = accessToken => {
  return fetch(`${API_URL}/auth/refresh`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());
};
