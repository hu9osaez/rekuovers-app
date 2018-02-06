import React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetNavigationTo } from '@core/utils';
import { fetchCovers } from '@store/covers/actions';
import { checkToken } from '@store/token/actions';

import styles from './styles';
import Sign from './components/Sign';

class SplashScreen extends React.Component {
  componentDidMount() {
    const { checking, isAuthenticated, rehydratedAt } = this.props.auth;

    if (rehydratedAt) {
      this.init(isAuthenticated, checking);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, rehydratedAt } = nextProps.auth;
    const { accessToken, checking, refreshing } = nextProps.token;

    if (this.props.auth.rehydratedAt !== rehydratedAt) {
      if (isAuthenticated) {
        this.props.checkToken(accessToken);
        this.props.fetchCovers();
      }

      if (!checking && !refreshing) {
        this.init(isAuthenticated);
      }
    }
  }

  init(authenticated) {
    const { navigation } = this.props;
    let routeName = authenticated ? 'Authenticated' : 'Unauthenticated';

    setTimeout(() => {
      resetNavigationTo(routeName, navigation);
    }, 2500);
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
  token: state.token,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ checkToken, fetchCovers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
