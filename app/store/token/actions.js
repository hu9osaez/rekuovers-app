import jwtDecode from 'jwt-decode';
import moment from 'moment';

import * as types from '../types';
import { refreshToken } from 'core/api';

export const checkToken = token => dispatch => {
  const isExpired = dispatch(isTokenExpired(token));

  if (isExpired) {
    dispatch({ type: types.REFRESHING_TOKEN });

    refreshToken(token).then(response => {
      if (response.success) {
        // Dispatch exito
        //dispatch({ type: types.REFRESHING_TOKEN_SUCCESS, data: response.data });
      } else {
        // Dispatch error
      }
    });
  }

  dispatch({ type: types.CHECKING_TOKEN_SUCCESS });
};

const isTokenExpired = token => dispatch => {
  dispatch({ type: types.CHECKING_TOKEN });

  const tokenExpiration = jwtDecode(token).exp;

  // If token will expire in the next 30 seconds.
  return !!(
    tokenExpiration && moment.unix(tokenExpiration) - moment(Date.now()) < 30
  );
};
