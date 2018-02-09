import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '@store/auth/actions';
import { fetchCurrentUser } from '@store/user/actions';

const ProfileScreen = ({ navigation, user, fetchCurrentUser, logoutUser }) => (
  <View>
    <Text>Profile</Text>
    <Text>{user.name}</Text>
    <Button title={'Datos'} onPress={() => fetchCurrentUser()} />
    <Button title={'Cerrar sesion'} onPress={() => logoutUser(navigation)} />
  </View>
);

ProfileScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" color={tintColor} />
  ),
};

const mapStateToProps = state => {
  const user = state.user.currentUser;
  return { user };
};

export default connect(mapStateToProps, { fetchCurrentUser, logoutUser })(
  ProfileScreen
);
