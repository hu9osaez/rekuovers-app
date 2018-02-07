import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginTop: 2,
    marginBottom: 10,
  },
});

const TitleHeaderDivider = () => <View style={styles.container} />;

export default TitleHeaderDivider;
