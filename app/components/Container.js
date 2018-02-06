import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const Container = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);

export { Container };
