import { REHYDRATE } from 'redux-persist/es/constants';
import * as types from '../types';

const INITIAL_STATE = {
  checking: false,
  refreshing: false,
  accessToken: null,
  rehydratedAt: null,
};

export const accessTokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHECKING_TOKEN:
      return {
        ...state,
        checking: true,
      };
    case types.CHECKING_TOKEN_SUCCESS:
      return {
        ...state,
        checking: false,
      };
    case types.REFRESHING_TOKEN:
      return {
        ...state,
        refreshing: true,
      };
    case types.REFRESHING_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.data.access_token,
        refreshing: false,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        accessToken: action.data.access_token,
      };
    case types.LOGOUT_USER:
      return INITIAL_STATE;
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.token,
        rehydratedAt: new Date(),
      };
    default:
      return state;
  }
};
