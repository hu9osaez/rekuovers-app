import './ReactotronConfig';

import React from 'react';
import { AppRegistry, } from 'react-native';
import { Provider } from 'react-redux';

import AppContainer from './app/root';
import store from './app/store/config';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Rekuovers', () => App);
