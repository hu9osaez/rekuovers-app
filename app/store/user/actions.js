import { currentUser, likedCoversCurrentUser } from '@core/api';
import * as types from '../types';

export const fetchCurrentUser = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_CURRENT_USER });

  currentUser(getState().auth.token).then(response => {
    if (response.success) {
      dispatch({ type: types.FETCH_CURRENT_USER_SUCCESS, data: response.data });
    } else {
      dispatch({ type: types.FETCH_CURRENT_USER_FAIL });
    }
  });
};
