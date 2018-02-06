import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { robotoWeights } from 'react-native-typography';
import { connect } from 'react-redux';

import FeaturedCover from './components/FeaturedCover';
import NewestCoverCard from './components/NewestCoverCard';

import styles from './styles';

class HomeScreen extends React.Component {
  goSongDetail(song) {
    this.props.navigation.navigate('CoverDetails', { song: song });
  }

  renderNewestCover = ({ item }) => {
    return (
      <NewestCoverCard cover={item} onPress={this.goSongDetail.bind(this)} />
    );
  };

  renderPopularCover = ({ item, index }) => {
    return <FeaturedCover cover={item} />;
  };

  render() {
    const { covers } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Swiper
            autoplay
            autoplayTimeout={6}
            height={200}
            width={360}
            containerStyle={{ flex: 0, backgroundColor: 'red' }}
            paginationStyle={{ bottom: 7 }}
          >
            {covers.popular.map(item => <FeaturedCover cover={item} />)}
          </Swiper>
          <Text
            style={[
              robotoWeights.condensedBold,
              { fontSize: 16, marginLeft: 5, marginTop: 12 },
            ]}
          >
            NEWEST
          </Text>
          <FlatList
            data={covers.newest.slice(0, 6)}
            refreshing={covers.loading}
            renderItem={this.renderNewestCover}
            keyExtractor={cover => cover.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: 7, paddingBottom: 10 }}
          />
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
  covers: state.covers,
});

export default connect(mapStateToProps)(HomeScreen);
