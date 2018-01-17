import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import { createRootNavigator } from './router';

console.disableYellowBox = true;

class AppContainer extends React.Component {
    render() {
        const Router = createRootNavigator();
        const { nav, dispatch } = this.props;
        return (
          <Router
            navigation={addNavigationHelpers({ dispatch, state: nav})}
          />
        );
    }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(AppContainer);
