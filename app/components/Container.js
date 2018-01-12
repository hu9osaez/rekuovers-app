import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
    </TouchableWithoutFeedback>
);

Container.propTypes = {
    children: PropTypes.any
};

export { Container };