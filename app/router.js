import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from './utils';

import {
  SplashScreen,
  WelcomeScreen,
  SignUpScreen,
  SignInScreen,
  HomeScreen as HomeTab,
  SearchScreen as SearchTab,
  ProfileScreen as ProfileTab,
  CoverDetailsScreen
} from './screens';

const tabOptions = {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: PRIMARY_COLOR,
    inactiveTintColor: SECONDARY_COLOR,
    showLabel: false,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: PRIMARY_COLOR
    },
    tabStyle: {
      height: 50
    },
    style: {
      backgroundColor: BACKGROUND_COLOR
    }
  }
};

export const LoggedOutNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Welcome: {
    screen: WelcomeScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  SignIn: {
    screen: SignInScreen
  }
}, {
  initialRouteName: 'Splash'
});

const SignedInNavigator = StackNavigator({
  Tabs: {
    screen: TabNavigator({
      HomeTab: { screen: HomeTab },
      SearchTab: { screen: SearchTab },
      ProfileTab: { screen: ProfileTab }
    }, tabOptions)
  },
  CoverDetails: {
    screen: CoverDetailsScreen
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator({
      SignedIn: {
        screen: SignedInNavigator
      },
      LoggedOut: {
        screen: LoggedOutNavigator
      }
    },
    {
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'LoggedOut'
    });
};
