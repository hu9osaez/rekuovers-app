import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '../types';

export const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
  rehydratedAt: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case types.LOGOUT_USER:
      return INITIAL_STATE;
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.auth,
        rehydratedAt: new Date(),
      };
    default:
      return state;
  }
};
