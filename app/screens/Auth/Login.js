import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Container } from '@components';
import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';

import { connect } from 'react-redux';
import { PRIMARY_COLOR } from '@core/common/colors';
import { isEmail } from '@core/utils';
import { loginUser } from '@store/auth/actions';

import styles from './styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    this.props.loginUser({ login: email, password }, navigation);
  };

  canBeSubmitted() {
    const { email, password } = this.state;
    const validEmail = isEmail(email);

    return email.length > 0 && password.length >= 6 && validEmail;
  }

  render() {
    let { loading, navigation } = this.props;
    let { email, password } = this.state;
    const buttonEnabled = this.canBeSubmitted();
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
              title={loading ? '' : 'LOG IN'}
              backgroundColor={PRIMARY_COLOR}
              borderRadius={8}
              containerViewStyle={{
                marginTop: 20,
                marginLeft: 0,
                marginRight: 0,
              }}
              loading={loading}
              onPress={this.onSubmit}
            />

            <Text
              style={{ color: '#cdcdcd', marginTop: 20, textAlign: 'center' }}
            >
              Forgot my password
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

LoginScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
  let { loading } = state.auth;
  return { loading };
};

export default connect(mapStateToProps, { loginUser })(LoginScreen);
