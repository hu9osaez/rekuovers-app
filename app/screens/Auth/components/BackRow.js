import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { PRIMARY_COLOR } from 'utils';

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  }
});

const BackRow = ({navigation}) =>
  <View style={styles.container}>
    <Icon
      color={PRIMARY_COLOR}
      containerStyle={{ alignItems: 'flex-start', width: 60 }}
      iconStyle={{ paddingLeft: 10 }}
      name={'chevron-left'}
      onPress={() => navigation.goBack()}
      size={38}
    />
  </View>;

export default BackRow;
