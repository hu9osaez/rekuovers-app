import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { normalize, Text } from 'react-native-elements';

import { SECONDAY_COLOR } from 'utils';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    paddingTop: 15
  },
  textStatus: {
    backgroundColor: SECONDAY_COLOR,
    borderRadius: 3,
    color: '#fff',
    position: 'absolute',
    bottom: 5,
    right: -3,
    paddingHorizontal: 3,
    fontSize: normalize(10),
    fontWeight: 'bold',
    transform: [{ rotate: '-30deg'}]
  }
});

const Logo = () =>
  <View style={styles.logoContainer}>
    <Image
      source={require('../assets/logo.png')}
    >
      <Text style={styles.textStatus}>ALPHA</Text>
    </Image>
  </View>;

export default Logo;
