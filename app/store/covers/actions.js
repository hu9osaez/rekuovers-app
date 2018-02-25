import * as types from '../types';
import { fetchNewestCovers, fetchPopularCovers } from '@core/api';
import { runSeries } from '@core/utils/lib';

export const fetchCovers = () => async dispatch => {
  dispatch({ type: types.REQUEST_COVERS });

  const responseNewest = await fetchNewestCovers();
  const responsePopular = await fetchPopularCovers();

  if (responseNewest.success) {
    dispatch({
      type: types.NEWEST_COVERS_SUCCESS,
      data: responseNewest.data,
    });
  }

  if (responsePopular.success) {
    dispatch({
      type: types.POPULAR_COVERS_SUCCESS,
      data: responsePopular.data,
    });
  }

  dispatch({ type: types.REQUEST_COVERS_SUCCESS });
};

export const updateLikesToCover = (coverId, likes) => dispatch => {
  dispatch({
    type: types.UPDATE_LIKES_COVER_SUCCESS,
    data: { coverId, likes },
  });
};
