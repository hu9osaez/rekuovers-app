export const API_URL = 'http://rekuovers.com/api';

const ACCEPT = {
  JSON: 'application/json',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

export const api = {
  root: API_URL,
  call: async (url, parameters) => {
    const finalUrl = `${api.root}${url}`;
    const response = await fetch(finalUrl, parameters);

    return response;
  },
  parameters: (accessToken, method = METHOD.GET, body) => {
    const withBody = [METHOD.POST];
    const params = {
      method,
      headers: {
        Accept: ACCEPT.JSON,
      },
    };

    if (withBody.indexOf(method) !== -1) {
      params.body = JSON.stringify(body);
      params.headers['Content-Type'] = 'application/json';
    }

    if (accessToken) {
      params.headers.Authorization = `Bearer ${accessToken}`;
    }

    return params;
  },
  get: async url => {
    const response = await api.call(url, api.parameters());

    return response;
  },
  getJson: async (url, accessToken) => {
    const response = await api.call(url, api.parameters(accessToken));

    return response.json();
  },
  post: async (url, body = {}, accessToken) => {
    const response = await api.call(
      url,
      api.parameters(accessToken, METHOD.POST, body)
    );

    return response.json();
  },
};

const authParameters = body => ({
  method: METHOD.POST,
  headers: {
    Accept: ACCEPT.JSON,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const fetchPostLogin = async data => {
  const response = await api.call('/auth/login', authParameters(data));

  return response.json();
};

export const fetchPostSignup = async data => {
  const response = await api.call('/auth/signup', authParameters(data));

  return response.json();
};

export const fetchPostLogout = async accessToken => {
  const response = await api.getJson('/auth/logout', accessToken);

  return response;
};

export const fetchRefreshToken = async accessToken => {
  const response = await api.getJson('/auth/refresh', accessToken);

  return response;
};

export const fetchAuthFacebook = async accessToken => {
  const data = {
    access_token: accessToken,
  };
  const response = await api.post('/auth/facebook', data);

  return response;
};

/** OLD **/
const authenticatedParameters = body => ({
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const authFb = accessToken => {
  return fetch(`${API_URL}/auth/facebook?access_token=${accessToken}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
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
