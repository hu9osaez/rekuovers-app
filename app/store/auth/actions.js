import * as types from '../types';
import { api } from 'utils';

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: types.LOGIN_USER });

  api.postLogin(data).then(response => {
    if(response.success) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
    }
    else {
      dispatch({ type: types.LOGIN_USER_FAIL });
    }
  });
};
