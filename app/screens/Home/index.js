import React from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react/native';

import SongCard from '../../components/SongCard';

const styles = {
  container: {
    backgroundColor: '#ffffff'
  }
};

@inject(stores => ({ ...stores }))
@observer
class HomeScreen extends React.Component {

  goSongDetail(song) {
    this.props.navigation.navigate('CoverDetails', { song: song });
  }

  renderSong = (song) => {
    return <SongCard song={song.item} onPress={this.goSongDetail.bind(this)} />;
  };

  _renderItem = ({item, index}) => {
      return (
          <View>
              <Text>{ item.youtube_id }</Text>
          </View>
      );
  };

  render() {
    let { isLoading, newest, popular } = this.props.store.covers;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={popular}
            renderItem={this._renderItem}
            sliderWidth={300}
            itemWidth={100}
          />
          <FlatList
            data={toJS(newest)}
            refreshing={isLoading}
            renderItem={this.renderSong}
            keyExtractor={cover => cover.id}
            style={{ padding: 2 }}
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
