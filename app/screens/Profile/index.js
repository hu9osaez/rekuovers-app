import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from 'store/auth/actions';

const ProfileScreen = ({navigation, logoutUser}) =>
<View>
  <Text>Profile</Text>
  <Button
    title={'Cerrar sesion'}
    onPress={() => logoutUser(navigation)}
  />
</View>;

ProfileScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (<Icon name="account-circle" color={tintColor} />)
};

export default connect(null, { logoutUser })(ProfileScreen);
