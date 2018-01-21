import './ReactotronConfig';

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import AppContainer from './app/root';
import { configureStore } from './app/store/config';

const { persistor, store } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Rekuovers', () => App);
