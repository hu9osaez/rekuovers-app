import { Alert } from 'react-native';
import * as types from '../types';
import { invalidateToken, postLogin, postSignup } from '@core/api';
import { resetNavigationTo } from '@core/utils';

import { fetchCovers } from '../covers/actions';

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
