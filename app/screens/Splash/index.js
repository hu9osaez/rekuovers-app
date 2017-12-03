import React from 'react';
import { Image, View } from 'react-native';
import { resetNavigationTo } from '../../utils';

import styles from './styles';
import Sign from './components/Sign';

class SplashScreen extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;

    setTimeout(() => {
      resetNavigationTo('Welcome', navigation);
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

/*SplashScreen.propTypes = {
  navigation: React.PropTypes.object
};*/

export { SplashScreen };
