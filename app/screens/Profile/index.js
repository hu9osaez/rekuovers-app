import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { onLogOut } from '../../utils';

import { NavigationActions } from 'react-navigation';


const ProfileScreen = ({navigation}) =>
<View>
  <Text>Profile</Text>
  <Button
    title={'Cerrar sesion'}
    onPress={() => onLogOut().then(() => {
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'LoggedOut' })]
        });

        navigation.dispatch(resetAction);
    })}
  />
</View>;

ProfileScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (<Icon name="account-circle" color={tintColor} />)
};

export { ProfileScreen };
