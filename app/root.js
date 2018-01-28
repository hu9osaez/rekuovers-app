import React from 'react';
import { RootNavigator } from './router';

console.disableYellowBox = true;

class AppContainer extends React.Component {

  render() {
    return (
      <RootNavigator />
    );
  }
}

export default AppContainer;
