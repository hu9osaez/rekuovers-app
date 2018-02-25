import * as types from '../types';

export const INITIAL_STATE = {
  loading: false,
  newest: [],
  popular: [],
};

export const coversReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_COVERS:
      return {
        ...state,
        loading: true,
      };
    case types.REQUEST_COVERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.NEWEST_COVERS_SUCCESS:
      return {
        ...state,
        newest: action.data,
      };
    case types.POPULAR_COVERS_SUCCESS:
      return {
        ...state,
        popular: action.data,
      };
    case types.UPDATE_LIKES_COVER_SUCCESS:
      const { coverId, likes } = action.data;
      return {
        ...state,
        newest: state.newest.map(
          cover => (cover.id === coverId ? { ...cover, likes } : cover)
        ),
        popular: state.popular.map(
          cover => (cover.id === coverId ? { ...cover, likes } : cover)
        ),
      };
    default:
      return state;
  }
};
