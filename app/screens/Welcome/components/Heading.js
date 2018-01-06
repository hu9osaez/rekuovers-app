import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { normalize } from 'react-native-elements';

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    marginBottom: 40,
    paddingRight: 50
  },
  headingText: {
    color: '#fff',
    fontFamily: 'sans-serif-thin',
    fontSize: normalize(28),
    alignSelf: 'flex-end',
    marginVertical: 3
  }
});

const Heading = () =>
  <View style={styles.headingContainer}>
    <Animatable.Text animation='bounceInRight' style={styles.headingText}>YOU'LL LOVE</Animatable.Text>
    <Animatable.Text animation='bounceInRight' delay={300} style={styles.headingText}>DISCOVER NEW</Animatable.Text>
    <Animatable.Text animation='bounceInRight' delay={600} style={styles.headingText}>MUSICAL COVERS</Animatable.Text>
  </View>;

export default Heading;
