import * as types from '../types';
import { postLogin } from 'core/api';
import { resetNavigationTo } from 'core/utils';

export const loginUser = (data, navigation) => async (dispatch) => {
  dispatch({ type: types.LOGIN_USER });

  postLogin(data).then(response => {
    if(response.success) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
      resetNavigationTo('Authenticated', navigation);
    }
    else {
      alert('Some failed in login'); // @TODO: Show correct error message
      dispatch({ type: types.LOGIN_USER_FAIL });
    }
  });
};

export const logoutUser = navigation => dispatch => {
  dispatch({ type: types.LOGOUT_USER });

  resetNavigationTo('Unauthenticated', navigation);
};
