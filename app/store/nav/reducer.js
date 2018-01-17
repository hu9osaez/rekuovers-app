import { createRootNavigator } from '../../router';

const AppNavigator = createRootNavigator();

const initialState = {
  index: 0,
  routes: [{key: 'LoggedOut', routeName: 'LoggedOut'}]
};

export const navigationReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);

  return newState || state;
};
