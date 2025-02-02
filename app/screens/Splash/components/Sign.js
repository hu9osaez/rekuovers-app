import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Text } from '@components';
import { SECONDARY_COLOR } from '@core/common/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  linesContainer: {
    flexDirection: 'row',
    zIndex: 2,
  },
  lineWrapper: {
    marginHorizontal: 30,
  },
  line: {
    backgroundColor: '#343434',
    width: 1,
    height: 40,
    position: 'relative',
  },
  clip: {
    position: 'absolute',
    bottom: 0,
    left: -5,
    width: 12,
    height: 12,
  },
  badge: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 3,
    alignItems: 'center',
    width: 90,
    height: 20,
    marginTop: -5,
    zIndex: 1,
  },
  textBadge: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const Sign = () => (
  <View style={styles.container}>
    <Animatable.View animation="fadeInUp" style={styles.linesContainer}>
      {Array(2)
        .fill()
        .map(() => (
          <View
            style={styles.lineWrapper}
            key={Math.random()
              .toString(36)
              .substr(2, 5)}
          >
            <View style={styles.line} />
            <Image
              source={require('../../../assets/paper-clip.png')}
              style={styles.clip}
            />
          </View>
        ))}
    </Animatable.View>
    <Animatable.View style={styles.badge} animation="bounceInDown">
      <Text size={13} style={styles.textBadge}>
        ALPHA
      </Text>
    </Animatable.View>
  </View>
);

export default Sign;
