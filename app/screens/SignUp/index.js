import React from 'react';
import { Text } from 'react-native-elements';

import { ImgBackground } from 'components';

class SignUpScreen extends React.Component {
    render() {
        return (
            <ImgBackground
                source={require('../../assets/bg-home-blur.png')}
            >
                <Text>Registro</Text>
            </ImgBackground>
        );
    }
}

SignUpScreen.navigationOptions = {
  title: 'Sign up'
};

export { SignUpScreen };
