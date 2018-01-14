import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 25
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    justifyContent: 'center',
    paddingLeft: 15
  },
  text: {
    fontSize: 18,
    fontFamily: 'sans-serif-light'
  }
});

const SocialRow = ({ handlePress, text }) =>
  <TouchableHighlight
    onPress={handlePress}
    underlayColor={'rgba(255, 255, 255, 0.3)'}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon
          color={'#3b5998'}
          name={'facebook-square'}
          type={'font-awesome'}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>;

export default SocialRow;
