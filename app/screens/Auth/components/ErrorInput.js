import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  text: {
    color: '#D32F2F',
  },
});

const ErrorInput = ({ hasError, message }) => (
  hasError && <Text style={styles.text}>{message}</Text>
);

export default ErrorInput;
