import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '@core/common/colors';

import {
  SplashScreen,
  WelcomeScreen,
  SignupScreen,
  LoginScreen,
  HomeTab,
  SearchScreen as SearchTab,
  ProfileTab,
  CoverDetailsScreen,
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
      backgroundColor: PRIMARY_COLOR,
    },
    tabStyle: {
      height: 50,
    },
    style: {
      backgroundColor: BACKGROUND_COLOR,
    },
  },
};

const UnauthenticatedNavigator = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
  },
  SignUp: {
    screen: SignupScreen,
  },
  Login: {
    screen: LoginScreen,
  },
});

const AuthenticatedNavigator = StackNavigator({
  Tabs: {
    screen: TabNavigator(
      {
        HomeTab: {
          screen: HomeTab,
        },
        SearchTab: {
          screen: SearchTab,
        },
        ProfileTab: {
          screen: ProfileTab,
        },
      },
      tabOptions
    ),
  },
  CoverDetails: {
    screen: CoverDetailsScreen,
  },
});

export const RootNavigator = StackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Authenticated: {
      screen: AuthenticatedNavigator,
    },
    Unauthenticated: {
      screen: UnauthenticatedNavigator,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splash',
  }
);
