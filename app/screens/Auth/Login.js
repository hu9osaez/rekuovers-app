import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Container } from 'components';
import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';

import { observer, inject } from 'mobx-react/native';
import { PRIMARY_COLOR, postSignIn, onSignIn, resetDeepNavigationTo } from 'utils';

import styles from './styles';

@inject(stores => ({ ...stores }))
@observer
class LoginScreen extends React.Component {
  handleLogin = () => {
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
    let { store: { auth }, navigation } = this.props;
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <BackRow navigation={navigation} />
          <SocialRow
            handlePress={() => console.log('Touched')}
            text={'Log in with Facebook'}
          />
          <View style={styles.content}>
            <SimpleInput
              onChangeText={(login) => auth.setLogin(login)}
              placeholder={'Email'}
              value={auth.login}
            />

            <SimpleInput
              onChangeText={(password) => auth.setPassword(password)}
              placeholder={'Password'}
              value={auth.password}
              secureTextEntry
            />

            <Button
              title={auth.isLoading ? '' : 'LOG IN'}
              backgroundColor={PRIMARY_COLOR}
              borderRadius={8}
              containerViewStyle={{
                marginTop: 20
              }}
              loading={auth.isLoading}
              onPress={this.handleLogin}
            />

            <Text style={{ color: '#cdcdcd', marginTop: 20, textAlign: 'center' }}>
              Forgot my password
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null
};

export { LoginScreen };
