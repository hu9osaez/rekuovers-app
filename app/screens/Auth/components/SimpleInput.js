import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    marginVertical: 11,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontWeight: '400',
    color: '#9E9E9E',
    paddingBottom: -5,
  },
});

const SimpleInput = props => (
  <View style={styles.container}>
    <TextInput
      autoCapitalize={'none'}
      autoCorrect={false}
      style={styles.input}
      placeholderTextColor={'#e1e1e1'}
      underlineColorAndroid={'transparent'}
      {...props}
    />
  </View>
);

export default SimpleInput;
