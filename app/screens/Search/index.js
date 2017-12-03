import React from 'react';
import { View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

const SearchScreen = () =>
  <View>
    <SearchBar
      placeholder='Type Here...' />
  </View>;

SearchScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (<Icon name="search" color={tintColor} />)
};

export { SearchScreen };
