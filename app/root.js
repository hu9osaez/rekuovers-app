import React from 'react';
import { RootNavigator } from './router';

console.disableYellowBox = true;

class AppContainer extends React.PureComponent {
  render() {
    return <RootNavigator />;
  }
}

export default AppContainer;
