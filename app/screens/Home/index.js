import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import FeaturedCovers from './components/FeaturedCovers';
import NewestCoversList from './components/NewestCoversList';
import PopularCoversList from './components/PopularCoversList';
import TrendingTags from './components/TrendingTagsCarousel';

import { fetchCovers } from '@store/covers/actions';

import styles from './styles';

class HomeScreen extends React.Component {
  componentDidMount() {
    console.tron.log('Mounted', true);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={() => this.props.fetchCovers()}
            />
          }
        >
          <FeaturedCovers />
          <PopularCoversList />
          <NewestCoversList />
          <TrendingTags />
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
};

const mapStateToProps = state => ({
  accessToken: state.auth.token,
  loading: state.covers.loading,
});

export default connect(mapStateToProps, { fetchCovers })(HomeScreen);
