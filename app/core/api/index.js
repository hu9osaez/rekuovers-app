export const API_URL = 'http://rekuovers.com/api';

const authParameters = body => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const authenticatedParameters = body => ({
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

export const invalidateToken = token => {
  return fetch(`${API_URL}/auth/logout`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
};

export const refreshToken = accessToken => {
  return fetch(`${API_URL}/auth/refresh`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());
};

export const newestCovers = () => {
  return fetch(`${API_URL}/covers/newest`, {
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.json());
};

export const popularCovers = () => {
  return fetch(`${API_URL}/covers/popular`, {
    headers: {
      Accept: 'application/json',
    },
  }).then(res => res.json());
};

export const checkCoverLike = (cover, accessToken) => {
  return fetch(`${API_URL}/covers/${cover}/likes/exists`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());
};

export const currentUser = accessToken => {
  return fetch(`${API_URL}/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());
};

export const likedCoversCurrentUser = accessToken => {
  return fetch(`${API_URL}/me/liked-covers`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => res.json());
};
