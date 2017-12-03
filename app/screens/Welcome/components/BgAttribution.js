import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon, normalize } from 'react-native-elements';

const styles = StyleSheet.create({
  attributionContainer: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    position: 'absolute',
    bottom: 3,
    right: 3,
    paddingHorizontal: 3,
    borderRadius: 3
  },
  touchable: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  iconContainer: {
    marginRight: 3,
    marginTop: 2
  },
  text: {
    color: '#fff',
    fontSize: normalize(10)
  }
});

const BgAttribution = () =>
  <View style={styles.attributionContainer}>
    <TouchableOpacity
      onPress={() => Linking.openURL('https://unsplash.com/@justmebreathing')}
      style={styles.touchable}
    >
      <Icon name={'camera-alt'} color={'#fff'} size={10} containerStyle={styles.iconContainer}/>
      <Text style={styles.text}>by @justmebreathing</Text>
    </TouchableOpacity>
  </View>;

export default BgAttribution;
