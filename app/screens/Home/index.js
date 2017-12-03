import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';

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
    this.props.navigation.navigate('Song', { song: song });
  }

  renderSong = (song) => {
    return <SongCard song={song.item} onPress={this.goSongDetail.bind(this)} />;
  };

  render() {
    let { isLoading, songs } = this.props.store.songs;
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={toJS(songs)}
            refreshing={isLoading}
            renderItem={this.renderSong}
            keyExtractor={song => song.id}
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
