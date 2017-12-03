import { NavigationActions } from 'react-navigation';

export const resetNavigationTo = (routeName, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });

  navigation.dispatch(resetAction);
};

export const resetDeepNavigationTo = (routeName, navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })]
  });

  navigation.dispatch(resetAction);
};
