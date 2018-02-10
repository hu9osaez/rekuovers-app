import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import {
  authFb,
  invalidateToken,
  postLogin,
  postSignup,
  refreshToken,
} from '@core/api';
import { resetNavigationTo } from '@core/utils';

import * as types from '../types';
import { fetchCovers } from '../covers/actions';
import { fetchCurrentUser } from '../user/actions';

export const connectWithFacebook = navigation => dispatch => {
  dispatch({ type: types.FETCH_FB_TOKEN });

  LoginManager.logInWithReadPermissions(['public_profile']).then(
    result => {
      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken().then(data => {
          authFb(data.accessToken.toString()).then(response => {
            if (response.success) {
              dispatch({ type: types.FETCH_FB_TOKEN_SUCCESS });
              dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
              dispatch(fetchCurrentUser());
              dispatch(fetchCovers());

              resetNavigationTo('Authenticated', navigation);
            } else {
              dispatch({ type: types.FETCH_FB_TOKEN_FAIL });

              Alert.alert('Error', 'Wrong request.\nPlease try again.');
            }
          });
        });
      }
    },
    error => {
      Alert.alert('Error', 'Wrong request.\nPlease try again.');
    }
  );
};

export const loginUser = (data, navigation) => dispatch => {
  dispatch({ type: types.LOGIN_USER });

  postLogin(data).then(response => {
    if (response.success) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
      dispatch(fetchCurrentUser());
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

export const signupUser = (data, navigation) => dispatch => {
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
  invalidateToken(getState().auth.token).then(response => {
    resetNavigationTo('Unauthenticated', navigation);
    dispatch({ type: types.LOGOUT_USER });
  });
};

export const checkToken = token => dispatch => {
  const tokenExpiration = jwtDecode(token).exp;

  const isExpired =
    tokenExpiration && moment.unix(tokenExpiration) - moment(Date.now()) < 30;

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
