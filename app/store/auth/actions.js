import { Alert } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import {
  fetchAuthFacebook,
  fetchPostLogin,
  fetchPostLogout,
  fetchPostSignup,
  fetchRefreshToken,
} from '@core/api';
import { resetNavigationTo } from '@core/utils';

import * as types from '../types';
import { fetchCovers } from '../covers/actions';
import { fetchCurrentUserData } from '../user/actions';

export const connectWithFacebook = navigation => dispatch => {
  dispatch({ type: types.FETCH_FB_TOKEN });

  LoginManager.logInWithReadPermissions(['public_profile']).then(
    async result => {
      if (!result.isCancelled) {
        const data = await AccessToken.getCurrentAccessToken();
        const response = await fetchAuthFacebook(data.accessToken.toString());

        if (response.success) {
          dispatch({ type: types.FETCH_FB_TOKEN_SUCCESS });
          dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
          dispatch(fetchCurrentUserData());
          dispatch(fetchCovers());

          resetNavigationTo('Authenticated', navigation);
        } else {
          dispatch({ type: types.FETCH_FB_TOKEN_FAIL });

          Alert.alert('Error', 'Wrong request.\nPlease try again.');
        }
      }
    },
    error => {
      Alert.alert('Error', 'Wrong request.\nPlease try again.');
    }
  );
};

export const loginUser = (data, navigation) => async dispatch => {
  dispatch({ type: types.LOGIN_USER });

  const response = await fetchPostLogin(data);

  if (response.success) {
    dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
    dispatch(fetchCurrentUserData());
    dispatch(fetchCovers());

    resetNavigationTo('Authenticated', navigation);
  } else {
    dispatch({ type: types.LOGIN_USER_FAIL });

    Alert.alert(
      'Incorrect credentials',
      'Wrong email or password.\nPlease try again.'
    );
  }
};

export const signupUser = (data, navigation) => async dispatch => {
  dispatch({ type: types.SIGNUP_USER });

  const response = await fetchPostSignup(data);

  if (response.success) {
    dispatch({ type: types.SIGNUP_USER_SUCCESS, data: response.data });

    resetNavigationTo('Authenticated', navigation);
  } else {
    dispatch({ type: types.SIGNUP_USER_FAIL });

    Alert.alert('Incorrect credentials', response.error.message);
  }
};

export const logoutUser = navigation => async (dispatch, getState) => {
  const response = await fetchPostLogout(getState().auth.token);

  resetNavigationTo('Unauthenticated', navigation);
  dispatch({ type: types.LOGOUT_USER });
};

export const checkToken = (forceRefresh = false) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;
  const tokenExpiration = jwtDecode(token).exp;

  const isExpired =
    tokenExpiration && moment.unix(tokenExpiration) - moment(Date.now()) < 30;

  if (isExpired || forceRefresh) {
    dispatch({ type: types.REFRESHING_TOKEN });

    const response = await fetchRefreshToken(token);

    if (response.success) {
      dispatch({ type: types.REFRESHING_TOKEN_SUCCESS, data: response.data });
    } else {
      const response = await fetchPostLogout(token);
      dispatch({ type: types.LOGOUT_USER });
    }
  }
};
