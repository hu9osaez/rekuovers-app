import * as types from '../types';

const INITIAL_STATE = {
  loading: false,
  dataToken: {},
  isAuthenticated: false
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
    default:
      return state;
  }
};
