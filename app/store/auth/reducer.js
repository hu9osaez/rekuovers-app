import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '../types';

export const INITIAL_STATE = {
  loading: false,
  loadingFb: false,
  isAuthenticated: false,
  isRefreshingToken: false,
  token: null,
  rehydratedAt: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REFRESHING_TOKEN:
      return {
        ...state,
        isRefreshingToken: true,
      };
    case types.REFRESHING_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.data.access_token,
        isRefreshingToken: false,
      };
    case types.REFRESHING_TOKEN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isRefreshingToken: false,
      };
    case types.SIGNUP_USER:
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case types.SIGNUP_USER_SUCCESS:
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.data.access_token,
      };
    case types.SIGNUP_USER_FAIL:
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    case types.FETCH_FB_TOKEN:
      return {
        ...state,
        loadingFb: true,
      };
    case types.FETCH_FB_TOKEN_SUCCESS:
      return {
        ...state,
        loadingFb: false,
      };
    case types.FETCH_FB_TOKEN_FAIL:
      return {
        ...state,
        loadingFb: false,
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
