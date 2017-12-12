import React from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-looped-carousel-improved';

import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react/native';

import SongCard from '../../components/SongCard';

const styles = {
  container: {
    backgroundColor: '#fbfbfb'
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

  render() {
    let { isLoading, newest, popular } = this.props.store.covers;
    return (
      <View style={styles.container}>
        <ScrollView>
            <Carousel
                delay={6000}
                style={{height: 200, width: 360}}
                autoplay
                isLooped
                bullets
                bulletStyle={{
                    margin: 5,
                    width: 6,
                    height: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 0
                }}
                chosenBulletStyle={{
                    margin: 5,
                    width: 6,
                    height: 6
                }}
                bulletsContainerStyle={{
                    marginTop: 15
                }}
            >
                <View style={{ backgroundColor: '#BADA55', height: 200, width: 360 }}><Text>1</Text></View>
                <View style={{ backgroundColor: 'red', height: 200, width: 360 }}><Text>2</Text></View>
                <View style={{ backgroundColor: 'blue', height: 200, width: 360 }}><Text>3</Text></View>
            </Carousel>
          <FlatList
            data={toJS(newest)}
            refreshing={isLoading}
            renderItem={this.renderCover}
            keyExtractor={cover => cover.id}
            style={{ paddingTop: 20, paddingHorizontal: 20 }}
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
