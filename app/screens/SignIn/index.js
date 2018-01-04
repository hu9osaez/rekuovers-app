import React from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Text, FormLabel, FormInput, Button, SocialIcon } from 'react-native-elements';

import { observer, inject } from 'mobx-react/native';
import { ImgBackground } from '../../components';
import { PRIMARY_COLOR, postSignIn, onSignIn, resetDeepNavigationTo } from '../../utils';

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    marginTop: 60,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  dividerContainer: {
  },
  textDivider: {
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 3,
    marginBottom: 10
  }
});

@inject(stores => ({ ...stores }))
@observer
class SignInScreen extends React.Component {
  handleSignIn = () => {
    let { store: { auth }, navigation } = this.props;

    auth.toggleLoading();

    postSignIn({login: auth.login, password: auth.password})
      .then(res => {

        auth.toggleLoading();

        if(res.success) {
          onSignIn(res.data.access_token).then(() => {
            resetDeepNavigationTo('SignedIn', navigation);
          });
        }
        else {
          ToastAndroid.show(res.error.message, ToastAndroid.SHORT);
        }
      });
  };

  render() {
    let { store: { auth } } = this.props;
    return (
      <ImgBackground
        source={require('../../assets/bg-home-blur.png')}
      >
        <View style={styles.content}>
          <SocialIcon
            title='Sign in with Facebook'
            button
            type='facebook'
          />

            <FormLabel labelStyle={{color: '#fff'}}>E-mail or username</FormLabel>
            <FormInput
              containerStyle={styles.inputContainer}
              underlineColorAndroid={'transparent'}
              onChangeText={(login) => auth.setLogin(login)}
              value={auth.login}
            />

            <FormLabel labelStyle={{color: '#fff'}}>Password</FormLabel>
            <FormInput
              secureTextEntry
              containerStyle={styles.inputContainer}
              underlineColorAndroid={'transparent'}
              onChangeText={(password) => auth.setPassword(password)}
              value={auth.password}
            />

          <Button
            title={auth.isLoading ? '' : 'SIGN IN'}
            backgroundColor={PRIMARY_COLOR}
            containerViewStyle={{
              marginTop: 10,
              marginBottom: 5
            }}
            loading={auth.isLoading}
            onPress={this.handleSignIn}
          />
          <Text style={{textAlign: 'center', color: '#fff'}}>
            Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign up</Text>
          </Text>
        </View>
      </ImgBackground>
    );
  }
}

SignInScreen.navigationOptions = {
  header: null
};

export { SignInScreen };
