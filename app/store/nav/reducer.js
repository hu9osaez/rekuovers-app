import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../../router';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init());

export const navReducer = (state = initialState, actions) => {

  const nextState = RootNavigator.router.getStateForAction(actions, state);

  return nextState || state;
};
