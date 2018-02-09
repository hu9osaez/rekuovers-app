import { currentUser, likedCoversCurrentUser } from '@core/api';
import * as types from '../types';

export const fetchCurrentUser = () => (dispatch, getState) => {
  dispatch({ type: types.FETCH_CURRENT_USER });

  const token = getState().auth.token;

  currentUser(token).then(response => {
    if (response.success) {
      dispatch({ type: types.FETCH_CURRENT_USER_SUCCESS, data: response.data });
      dispatch(fetchlikedCoversIds(token));
    } else {
      dispatch({ type: types.FETCH_CURRENT_USER_FAIL });
    }
  });
};

export const fetchlikedCoversIds = token => dispatch => {
  dispatch({ type: types.FETCH_LIKED_COVERS });

  likedCoversCurrentUser(token).then(response => {
    if (response.success) {
      dispatch({ type: types.FETCH_LIKED_COVERS_SUCCESS, data: response.data });
    } else {
      dispatch({ type: types.FETCH_LIKED_COVERS_FAIL });
    }
  });
};
