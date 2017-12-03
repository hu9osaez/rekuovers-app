import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { ImgBackground } from '../../components';
import { PRIMARY_COLOR, PRIMARY_COLOR_TEXT } from '../../utils';

import Heading from './components/Heading';
import BgAttribution from './components/BgAttribution';
import styles from './styles';

const WelcomeScreen = ({navigation}) =>
  <ImgBackground source={require('../../assets/bg-home.png')}>
    <View style={styles.contentContainer}>
      <Heading/>
      <Button
        title='Sign up'
        backgroundColor={PRIMARY_COLOR}
        color={'#fff'}
        containerViewStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={ () => navigation.navigate('SignUp')}
      />
      <Button
        title='Sign in'
        backgroundColor={'#fff'}
        color={PRIMARY_COLOR_TEXT}
        containerViewStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={ () => navigation.navigate('SignIn')}
      />
    </View>
    <BgAttribution />
  </ImgBackground>;

WelcomeScreen.navigationOptions = {
  header: null
};

export { WelcomeScreen };
