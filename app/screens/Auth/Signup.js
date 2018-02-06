import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { Container } from '@components';
import BackRow from './components/BackRow';
import SocialRow from './components/SocialRow';
import SimpleInput from './components/SimpleInput';

import { PRIMARY_COLOR } from '@core/common/colors';

import styles from './styles';

class SignupScreen extends React.Component {
  render() {
    let { navigation } = this.props;
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <BackRow navigation={navigation} />
          <SocialRow
            handlePress={() => console.log('Touched')}
            text={'Sign up with Facebook'}
          />
          <View style={styles.content}>
            <SimpleInput placeholder={'Name'} />

            <SimpleInput placeholder={'Email'} />

            <SimpleInput placeholder={'Password'} secureTextEntry />

            <Button
              raised
              title={'SIGN UP'}
              backgroundColor={PRIMARY_COLOR}
              borderRadius={8}
              containerViewStyle={{
                marginTop: 20,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
          </View>
        </View>
      </Container>
    );
  }
}

SignupScreen.navigationOptions = {
  header: null,
};

export { SignupScreen };
