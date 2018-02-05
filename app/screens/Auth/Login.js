import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import { Container } from 'components';
import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';

import { connect } from 'react-redux';
import { PRIMARY_COLOR } from 'utils';
import { validateData } from 'core/utils';
import { loginUser } from 'store/auth/actions';

import styles from './styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.rules = {
      email: 'required|email',
      password: 'required',
    };
  }

  onSubmitLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    const validation = validateData({ email, password }, this.rules);

    if (validation.passes()) {
      this.props.loginUser({ login: email, password }, navigation);
    } else {
      this.toast.show('Wrong email or password');
    }
  };

  render() {
    let { loading, navigation } = this.props;
    let { email, password } = this.state;
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
              onChangeText={email => this.setState({ email })}
              placeholder={'Email'}
              value={email}
            />

            <SimpleInput
              onChangeText={password => this.setState({ password })}
              placeholder={'Password'}
              value={password}
              secureTextEntry
            />

            <Button
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
              onPress={this.onSubmitLogin}
            />

            <Text
              style={{ color: '#cdcdcd', marginTop: 20, textAlign: 'center' }}
            >
              Forgot my password
            </Text>
          </View>
          <Toast
            position={'center'}
            ref={toast => (this.toast = toast)}
          />
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
