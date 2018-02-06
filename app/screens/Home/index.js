import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { robotoWeights } from 'react-native-typography';

import SongCard from '@components/SongCard';
import FeaturedCover from './components/FeaturedCover';
import SurpriseMe from './components/SurpriseMe';

const styles = {
  container: {
    backgroundColor: '#fbfbfb',
  },
};

class HomeScreen extends React.Component {
  goSongDetail(song) {
    this.props.navigation.navigate('CoverDetails', { song: song });
  }

  renderCover = song => {
    return <SongCard song={song.item} onPress={this.goSongDetail.bind(this)} />;
  };

  renderPopularCover = ({ item, index }) => {
    return <FeaturedCover cover={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/*<Swiper
                autoplay
                autoplayTimeout={6}
                height={200}
                width={360}
                containerStyle={{ flex: 0, backgroundColor: 'red' }}
                paginationStyle={{ bottom: 7 }}
            >
                {popular.map((item) => <FeaturedCover cover={item} />)}
            </Swiper>*/}
          <SurpriseMe />
          <Text
            style={[
              robotoWeights.condensedBold,
              { fontSize: 16, marginLeft: 5, marginTop: 12 },
            ]}
          >
            NEW COVERS
          </Text>
          {/*<FlatList
            data={toJS(newest)}
            refreshing={isLoading}
            renderItem={this.renderCover}
            keyExtractor={cover => cover.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: 7, paddingBottom: 10 }}
          />*/}
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Explore',
  tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
};

export { HomeScreen };
