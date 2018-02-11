import { fetchCurrentUser, fetchLikedCovers } from '@core/api';
import * as types from '../types';

export const fetchCurrentUserData = () => async (dispatch, getState) => {
  dispatch({ type: types.FETCH_CURRENT_USER });

  const token = getState().auth.token;
  const response = await fetchCurrentUser(token);

  if (response.success) {
    dispatch({ type: types.FETCH_CURRENT_USER_SUCCESS, data: response.data });
    dispatch(fetchlikedCoversIds(token));
  } else {
    dispatch({ type: types.FETCH_CURRENT_USER_FAIL });
  }
};

export const fetchlikedCoversIds = token => async dispatch => {
  dispatch({ type: types.FETCH_LIKED_COVERS });

  const response = await fetchLikedCovers(token);

  if (response.success) {
    dispatch({ type: types.FETCH_LIKED_COVERS_SUCCESS, data: response.data });
  } else {
    dispatch({ type: types.FETCH_LIKED_COVERS_FAIL });
  }
};
