import React from 'react';
import { ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import FeaturedCovers from './components/FeaturedCovers';
import NewestCoversList from './components/NewestCoversList';
import PopularCoversList from './components/PopularCoversList';
import TrendingTagsList from './components/TrendingTagsList';

import styles from './styles';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FeaturedCovers />
          <PopularCoversList />
          <NewestCoversList />
          <TrendingTagsList />
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Explore',
  tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
};

const mapStateToProps = state => ({
  accessToken: state.token.accessToken,
});

export default connect(mapStateToProps)(HomeScreen);
