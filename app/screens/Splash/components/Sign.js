import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import { SECONDARY_COLOR } from 'utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  linesContainer: {
    flexDirection: 'row',
    zIndex: 2
  },
  lineWrapper: {
    marginHorizontal: 30
  },
  line: {
    backgroundColor: '#343434',
    width: 1,
    height: 40,
    position: 'relative'
  },
  clip: {
    position: 'absolute',
    bottom: 0,
    left: -5,
    width: 12,
    height: 12
  },
  badge: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 3,
    alignItems: 'center',
    width: 90,
    height: 20,
    transform: [
      { rotate: '-5deg'}
    ],
    marginTop: -5,
    zIndex: 1
  },
  textBadge: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

const Sign = () =>
  <View style={styles.container}>
    <Animatable.View animation='fadeInUp' style={styles.linesContainer}>
      {Array(2).fill().map(() =>
        <View style={styles.lineWrapper}>
          <View style={styles.line} />
          <Image
            source={require('../../../assets/paper-clip.png')}
            style={styles.clip}
          />
        </View>
      )}
    </Animatable.View>
    <Animatable.View
      style={styles.badge}
      animation='bounceInDown'
    >
      <Text style={styles.textBadge}>ALPHA</Text>
    </Animatable.View>
  </View>;

export default Sign;
