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
    default:
      return state;
  }
};
