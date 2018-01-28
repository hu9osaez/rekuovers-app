import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '../types';

const INITIAL_STATE = {
  loading: false,
  dataToken: {},
  isAuthenticated: false,
  rehydratedAt: null
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        dataToken: action.data
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case types.LOGOUT_USER:
      return INITIAL_STATE;
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.auth,
        rehydratedAt: new Date()
      };
    default:
      return state;
  }
};
