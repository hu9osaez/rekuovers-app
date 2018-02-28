import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { ImgBackground, Text } from '@components';

import Heading from './components/Heading';
import BgAttribution from './components/BgAttribution';
import styles from './styles';

const WelcomeScreen = ({ navigation }) => (
  <ImgBackground source={require('../../assets/bg-home.png')}>
    <View style={styles.contentContainer}>
      <Heading />
      <Button
        title={'SIGN UP'}
        color={'#ffffff'}
        outline
        borderRadius={12}
        containerViewStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        textStyle={{
          fontWeight: 'bold',
        }}
        onPress={() => navigation.navigate('SignUp')}
      />
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.loginTextSecondary}
        >
          Login
        </Text>
      </Text>
    </View>
    <BgAttribution />
  </ImgBackground>
);

WelcomeScreen.navigationOptions = {
  header: null,
};

export { WelcomeScreen };
