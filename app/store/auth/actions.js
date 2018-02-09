import { Alert } from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { invalidateToken, postLogin, postSignup, refreshToken } from '@core/api';
import { resetNavigationTo } from '@core/utils';

import * as types from '../types';
import { fetchCovers } from '../covers/actions';

export const checkToken = token => dispatch => {

  const tokenExpiration = jwtDecode(token).exp;

  const isExpired = tokenExpiration && moment.unix(tokenExpiration) - moment(Date.now()) < 30;

  if (isExpired) {
    dispatch({ type: types.REFRESHING_TOKEN });

    refreshToken(token).then(response => {
      if (response.success) {
        // Dispatch exito
        dispatch({ type: types.REFRESHING_TOKEN_SUCCESS, data: response.data });
      } else {
        // Dispatch error
        // @TODO: Do something when request failed
      }
    });
  }
};

export const loginUser = (data, navigation) => async dispatch => {
  dispatch({ type: types.LOGIN_USER });

  postLogin(data).then(response => {
    if (response.success) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
      dispatch(fetchCovers());

      resetNavigationTo('Authenticated', navigation);
    } else {
      dispatch({ type: types.LOGIN_USER_FAIL });

      Alert.alert(
        'Incorrect credentials',
        'Wrong email or password.\nPlease try again.'
      );
    }
  });
};

export const signupUser = (data, navigation) => async dispatch => {
  dispatch({ type: types.SIGNUP_USER });

  postSignup(data).then(response => {
    if (response.success) {
      dispatch({ type: types.SIGNUP_USER_SUCCESS, data: response.data });

      resetNavigationTo('Authenticated', navigation);
    } else {
      dispatch({ type: types.SIGNUP_USER_FAIL });

      Alert.alert('Incorrect credentials', response.error.message);
    }
  });
};

export const logoutUser = navigation => (dispatch, getState) => {
  invalidateToken(getState().token.accessToken).then(response => {
    dispatch({ type: types.LOGOUT_USER });
    resetNavigationTo('Unauthenticated', navigation);
  });
};
