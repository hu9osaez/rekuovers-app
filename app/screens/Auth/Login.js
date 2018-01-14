import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { Container } from 'components';
import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';

import { PRIMARY_COLOR, postLogin, onSignIn, resetDeepNavigationTo } from 'utils';

import styles from './styles';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }

  toggleLoading = () => {
    this.setState({isLoading: !this.state.isLoading});
  };

  render() {
    let { navigation } = this.props;
    let { email, password, isLoading } = this.state;
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
              onChangeText={email => this.setState({email})}
              placeholder={'Email'}
              value={email}
            />

            <SimpleInput
              onChangeText={password => this.setState(password)}
              placeholder={'Password'}
              value={password}
              secureTextEntry
            />

            <Button
              raised
              title={isLoading ? '' : 'LOG IN'}
              backgroundColor={PRIMARY_COLOR}
              borderRadius={8}
              containerViewStyle={{
                marginTop: 20,
                marginLeft: 0,
                marginRight: 0
              }}
              loading={isLoading}
              onPress={this.toggleLoading}
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
