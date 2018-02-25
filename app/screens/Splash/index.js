import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetNavigationTo } from '@core/utils';
import { checkToken } from '@store/auth/actions';
import { fetchCovers } from '@store/covers/actions';
import { fetchCurrentUserData } from '@store/user/actions';

import styles from './styles';
import Sign from './components/Sign';

class SplashScreen extends React.Component {
  componentDidMount() {
    const { isAuthenticated, rehydratedAt } = this.props.auth;

    if (rehydratedAt) {
      this.init(isAuthenticated);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isRefreshingToken, isAuthenticated, rehydratedAt } = nextProps.auth;

    if (this.props.auth.rehydratedAt !== rehydratedAt) {
      if (isAuthenticated) {
        this.props.checkToken();
        this.props.fetchCovers();

        setTimeout(() => {
          this.props.fetchCurrentUserData();
        }, 500);
      }

      if (!isRefreshingToken) {
        this.init(isAuthenticated);
      }
    }
  }

  init(authenticated) {
    const { navigation } = this.props;
    let routeName = authenticated ? 'Authenticated' : 'Unauthenticated';

    setTimeout(() => {
      resetNavigationTo(routeName, navigation);
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/guitar_pick.png')}
            style={styles.isotipe}
          />
        </View>
        <Sign />
      </View>
    );
  }
}

SplashScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { checkToken, fetchCovers, fetchCurrentUserData },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
