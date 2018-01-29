import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: 50,
    width: 360,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class SurpriseMe extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Surprise Me</Text>
      </View>
    );
  }
}

export default SurpriseMe;
