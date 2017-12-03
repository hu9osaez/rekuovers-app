import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Text,
  Icon,
  Slider
} from 'react-native-elements';
import YouTube from 'react-native-youtube';
import { PRIMARY_COLOR, SECONDAY_COLOR } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  youtubePlayer: {
    alignSelf: 'stretch',
    height: 250,
    backgroundColor: '#000'
  },
  contentContainer: {
    backgroundColor: '#fff'
  }
});

class SongScreen extends React.Component {
  state = {
    isReady: false,
    isPlaying: false,
    state: null
  };

  onReady = (e) => {
    this.setState({ isReady: true });
  };

  changeState = (e) => {
    let self = this;

    this.setState({ status: e.state });

    if (e.state === 'playing') {
      this.setState({ isPlaying: true })
    }
    else if (e.state === 'stopped' || e.state === 'paused' || e.state === 'ended') {
      setTimeout(function() {
        self.setState({ isPlaying: false });
      }, 200);
    }
  };

  togglePlay = () => {
    let self = this;

    setTimeout(function() {
      self.setState(s => ({ isPlaying: !s.isPlaying }));
    }, 100);
  };

  render() {
    const { song } = this.props.navigation.state.params;
    let { isReady, isPlaying } = this.state;

    return (
      <View style={styles.container}>
        <YouTube
          apiKey={'AIzaSyDEGxujgp4qSdZt4R7XZEr6KPPt4D8QxEY'}
          videoId={song.youtube_id}
          play={isPlaying}
          controls={1}
          onReady={this.onReady}
          onChangeState={this.changeState}

          style={styles.youtubePlayer}
        />
      </View>
    );
  }
}

SongScreen.navigationOptions = {
  header: null
  //title: ({state}) => `${state.params.song.originalSong}'s Details`
};

export { SongScreen };
