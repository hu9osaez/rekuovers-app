import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '../types';

export const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  likedCovers: [],
  rehydratedAt: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.data,
      };
    case types.FETCH_CURRENT_USER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case types.LOGOUT_USER:
      return INITIAL_STATE;
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.user,
        rehydratedAt: new Date(),
      };
    default:
      return state;
  }
};
