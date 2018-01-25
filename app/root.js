import React from 'react';
import { RootNavigator } from './router';

import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

console.disableYellowBox = true;

const AppContainer = ({ dispatch, nav }) => {
  return (
    <RootNavigator
      navigation={addNavigationHelpers({
        dispatch,
        state: nav
      })}
    />
  )
};

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppContainer);
