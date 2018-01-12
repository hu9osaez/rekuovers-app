import React from 'react';
import {
    StyleSheet,
    ToastAndroid,
    View
} from 'react-native';
import { Text, FormInput, Button } from 'react-native-elements';

import { observer, inject } from 'mobx-react/native';
import { Container } from 'components';
import { PRIMARY_COLOR, postSignIn, onSignIn, resetDeepNavigationTo } from '../../utils';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    marginVertical: 11
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontWeight: '400',
    color: '#e1e1e1',
    paddingBottom: -5
  },
  footer: {
      backgroundColor: '#ffffff',
      height: 50,
      justifyContent: 'center'
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
      <Container>
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text
              h2
              style={{
                  marginLeft: 15
              }}
            >Log In</Text>

            <FormInput
              autoCapitalize={'none'}
              autoCorrect={false}
              containerStyle={styles.inputContainer}
              onChangeText={(login) => auth.setLogin(login)}
              placeholder={'Email'}
              placeholderTextColor={'#e1e1e1'}
              underlineColorAndroid={'transparent'}
              value={auth.login}
              inputStyle={styles.input}
            />

            <FormInput
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
              containerStyle={styles.inputContainer}
              onChangeText={(password) => auth.setPassword(password)}
              placeholder={'Password'}
              placeholderTextColor={'#e1e1e1'}
              underlineColorAndroid={'transparent'}
              value={auth.password}
              inputStyle={styles.input}
            />

            <Button
              title={auth.isLoading ? '' : 'Log In'}
              backgroundColor={PRIMARY_COLOR}
              borderRadius={12}
              containerViewStyle={{
                marginTop: 10,
                marginBottom: 5
              }}
              loading={auth.isLoading}
              onPress={this.handleSignIn}
            />
          </View>
          <View style={styles.footer}>
            <Text style={{textAlign: 'center'}}>
              Don't have an account? <Text style={{fontWeight: 'bold'}}>Sign up</Text>
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

SignInScreen.navigationOptions = {
  header: null
};

export { SignInScreen };
