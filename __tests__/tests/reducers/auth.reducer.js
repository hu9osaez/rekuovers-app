import { authReducer, INITIAL_STATE } from 'store/auth/reducer';
import * as types from 'store/types';

describe('Auth Reducer', () => {
  it('should set loading: true when LOGIN_USER action is dispatched', () => {
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };

    const action = {
      type: types.LOGIN_USER,
    };

    expect(authReducer(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
