import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Slider, Text } from 'react-native-elements';
import YouTube from 'react-native-youtube';
import timer from 'react-native-timer';

import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_COLOR_TEXT,
} from '@core/common/colors';
import { secondsToTime } from '@core/utils/text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  playerControls: {
    flexDirection: 'row',
    height: 45,
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  playContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  totalTimeContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sliderContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 5,
  },
});

class CoverDetailsScreen extends React.Component {
  state = {
    duration: 0,
    firstPlay: false,
    isPlaying: false,
    isReady: false,
    statePlayer: null,
    cTime: 0,
  };

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  playerOnReady = e => {
    this.setState({ isReady: true });
  };

  togglePlay = () => {
    let self = this;

    if (self.state.firstPlay === false) {
      self.setState({ firstPlay: true });
      self.player.duration().then(d => self.setState({ duration: d }));

      timer.setInterval(
        self,
        'seconds',
        () => {
          self.player
            .currentTime()
            .then(currentTime => this.setState({ cTime: currentTime }));
        },
        200
      );
    }

    setTimeout(function() {
      self.setState(s => ({ isPlaying: !s.isPlaying }));
    }, 100);
  };

  handleStatePlayer = e => {
    if (e.state === 'loading') {
      this.player.duration().then(d => this.setState({ duration: d }));
    }

    if (e.state === 'playing') {
      this.setState({ isPlaying: true });
    }

    if (e.state === 'paused') {
      this.setState({ isPlaying: false });
    }

    if (e.state === 'stopped') {
      this.setState({ isPlaying: false });
    }

    this.setState({ statePlayer: e.state });
  };

  render() {
    const { cover } = this.props.navigation.state.params;
    let { cTime, duration, isPlaying, isReady, statePlayer } = this.state;

    return (
      <View style={styles.container}>
        <YouTube
          apiKey={'AIzaSyDEGxujgp4qSdZt4R7XZEr6KPPt4D8QxEY'}
          ref={item => (this.player = item)}
          videoId={cover.youtube_id}
          play={isPlaying}
          controls={0}
          onReady={this.playerOnReady}
          onChangeState={this.handleStatePlayer}
          resumePlayAndroid={false}
          style={{ alignSelf: 'stretch', height: 221 }}
        />
        <View style={styles.playerControls}>
          <View style={styles.playContainer}>
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={40}
              color={isReady ? PRIMARY_COLOR : SECONDARY_COLOR}
              onPress={this.togglePlay}
              disabled={!isReady}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              maximumValue={duration}
              step={1}
              value={cTime}
              thumbTintColor={PRIMARY_COLOR}
              thumbStyle={{ borderRadius: 0, width: 4, height: 10 }}
              onValueChange={value => this.player.seekTo(value)}
            />
          </View>
          <View style={styles.totalTimeContainer}>
            <Text>
              {secondsToTime(cTime)} / {secondsToTime(duration)}
            </Text>
          </View>
        </View>
        <Text>{statePlayer}</Text>
      </View>
    );
  }
}

CoverDetailsScreen.navigationOptions = {
  header: null,
};

export { CoverDetailsScreen };
