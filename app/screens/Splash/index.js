import React from 'react';
import { Image, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import styles from './styles';
import Sign from './components/Sign';

class SplashScreen extends React.Component {
  componentDidMount() {
    const { isAuthenticated, rehydratedAt } = this.props;

    if (rehydratedAt) {
      this.init(isAuthenticated);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated } = nextProps;

    this.init(isAuthenticated);
  }

  init(authenticated) {
    const { navigation } = this.props;
    let routeName = authenticated ? 'Authenticated' : 'Unauthenticated';

    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
      key: null
    });

    setTimeout(() => {
      navigation.dispatch(resetAction);
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
  header: null
};

const mapStateToProps = state => {
  const { isAuthenticated, rehydratedAt } = state.auth;
  return { isAuthenticated, rehydratedAt };
};

export default connect(mapStateToProps)(SplashScreen);
