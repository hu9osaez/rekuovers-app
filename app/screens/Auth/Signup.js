import React from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';
import { Container } from '@components';

import { PRIMARY_COLOR } from '@core/common/colors';
import { isEmail, validateData } from '@core/utils';

import styles from './styles';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
    };

    this.rules = {
      name: 'required',
      username: 'required|alpha_num|min:3',
      email: 'required|email',
      password: 'required|min:6',
    };
  }

  onSubmit = () => {
    const validation = validateData(this.state, this.rules);

    if (validation.passes()) {
    } else {
      console.tron.log(validation.errors.all());
      Alert.alert('Error', 'Error in validation');
    }
  };

  canBeSubmitted() {
    const { name, username, email, password } = this.state;
    const validEmail = isEmail(email);

    return (
      name.length > 0 &&
      username.length >= 3 &&
      email.length > 0 &&
      password.length > 0 &&
      validEmail
    );
  }

  render() {
    let { navigation } = this.props;
    let { name, username, email, password } = this.state;
    const buttonEnabled = this.canBeSubmitted();
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <KeyboardAwareScrollView>
            <BackRow navigation={navigation} />
            <SocialRow
              handlePress={() => console.log('Touched')}
              text={'Sign up with Facebook'}
            />
            <View style={styles.content}>
              <SimpleInput
                onChangeText={name => this.setState({ name })}
                placeholder={'Name'}
                value={name}
              />

              <SimpleInput
                onChangeText={username => this.setState({ username })}
                placeholder={'Username'}
                value={username}
              />

              <SimpleInput
                onChangeText={email =>
                  this.setState({ email: email.replace(/ /g, '_') })
                }
                keyboardType={'email-address'}
                placeholder={'Email'}
                value={email}
              />

              <SimpleInput
                onChangeText={password => this.setState({ password: password })}
                placeholder={'Password'}
                value={password}
                secureTextEntry
              />

              <Button
                disabled={!buttonEnabled}
                raised
                title={'SIGN UP'}
                backgroundColor={PRIMARY_COLOR}
                borderRadius={8}
                containerViewStyle={{
                  marginBottom: 20,
                  marginTop: 20,
                  marginLeft: 0,
                  marginRight: 0,
                }}
                onPress={this.onSubmit}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
}

SignupScreen.navigationOptions = {
  header: null,
};

export { SignupScreen };
