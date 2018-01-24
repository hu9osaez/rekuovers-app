import { NavigationActions } from 'react-navigation';
import * as types from '../types';
import { postLogin } from 'core/api';

export const loginUser = (data, nav) => async (dispatch) => {
  dispatch({ type: types.LOGIN_USER });

  postLogin(data).then(response => {
    if(response.success) {
      dispatch({ type: types.LOGIN_USER_SUCCESS, data: response.data });
    }
    else {
      dispatch({ type: types.LOGIN_USER_FAIL });
    }
  });
};

export const logoutUser = navigation => (dispatch) => {
  dispatch({ type: types.LOGOUT_USER });

  const logoutAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Unauthenticated' })],
    key: null,
  });

  navigation.dispatch(logoutAction);
};
