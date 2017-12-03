import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { onLogOut } from '../../utils';

const ProfileScreen = () =>
<View>
  <Text>Profile</Text>
  <Button
    title={'Cerrar sesion'}
    onPress={() => onLogOut().then(() => alert('LoggedOut'))}
  />
</View>;

ProfileScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (<Icon name="account-circle" color={tintColor} />)
};

export { ProfileScreen };
