import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';

import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react/native';

import SongCard from '../../components/SongCard';
import FeaturedCover from './components/FeaturedCover';

const styles = {
  container: {
    backgroundColor: '#fbfbfb',
  }
};

@inject(stores => ({ ...stores }))
@observer
class HomeScreen extends React.Component {

  goSongDetail(song) {
    this.props.navigation.navigate('CoverDetails', { song: song });
  }

  renderCover = (song) => {
    return <SongCard song={song.item} onPress={this.goSongDetail.bind(this)} />;
  };

  renderPopularCover = ({item, index}) => {
    return <FeaturedCover cover={item} />;
  };

  render() {
    let { isLoading, newest, popular } = this.props.store.covers;
    return (
      <View style={styles.container}>
        <ScrollView>
            <Swiper
                autoplay
                autoplayTimeout={6}
                height={200}
                width={360}
                containerStyle={{ flex: 0 }}
                paginationStyle={{ bottom: 10}}
            >
                {popular.map((item) => <FeaturedCover cover={item} />)}
            </Swiper>
            <Text>Heading 4</Text>
          <FlatList
            data={toJS(newest)}
            refreshing={isLoading}
            renderItem={this.renderCover}
            keyExtractor={cover => cover.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10 }}
          />
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => (<Icon name='home' color={tintColor} />)
};

export { HomeScreen };
