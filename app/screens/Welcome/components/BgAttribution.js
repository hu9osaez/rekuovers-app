import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Text } from '@components';

const styles = StyleSheet.create({
  attributionContainer: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    position: 'absolute',
    bottom: 3,
    right: 3,
    paddingHorizontal: 3,
    borderRadius: 3,
  },
  touchable: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: 3,
    marginTop: 2,
  },
  text: {
    color: '#fff',
  },
});

const BgAttribution = () => (
  <View style={styles.attributionContainer}>
    <TouchableOpacity
      onPress={() => Linking.openURL('https://unsplash.com/@justmebreathing')}
      style={styles.touchable}
    >
      <Icon
        name={'camera-alt'}
        color={'#fff'}
        size={10}
        containerStyle={styles.iconContainer}
      />
      <Text size={10} style={styles.text}>
        by @justmebreathing
      </Text>
    </TouchableOpacity>
  </View>
);

export default BgAttribution;
