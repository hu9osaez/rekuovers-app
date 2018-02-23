import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Slider, Text } from 'react-native-elements';
import { colorsFromUrl } from 'react-native-dominant-color';
import YouTube from 'react-native-youtube';
import moment from 'moment';
import timer from 'react-native-timer';
import { connect } from 'react-redux';

import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TEXT,
  SECONDARY_COLOR,
  SECONDARY_COLOR_TEXT,
} from '@core/common/colors';
import { abbreviateNumber, secondsToTime } from '@core/utils/text';

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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sliderContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  totalTimeContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  detailsContainer: {
    height: 72,
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'OswaldBold',
    fontSize: 12,
    color: '#cacaca',
  },
  usernameText: {
    fontFamily: 'OswaldBold',
    fontSize: 12,
    color: PRIMARY_COLOR,
  },
  nameText: {
    fontFamily: 'OswaldMedium',
    fontSize: 16,
    color: PRIMARY_COLOR_TEXT,
  },
  tagsContainer: {
    height: 40,
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    height: 70,
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 1,
  },
  actionBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f7f7f7',
  },
  likesText: {
    fontSize: 24,
    fontFamily: 'OswaldMedium',
    color: PRIMARY_COLOR_TEXT,
    paddingBottom: 5,
  }
});

class CoverDetailsScreen extends React.PureComponent {
  state = {
    duration: 0,
    firstPlay: false,
    isPlaying: false,
    isReady: false,
    cTime: 0,
    bgColor: '#cccccc',
  };

  componentDidMount() {
    const { cover } = this.props.navigation.state.params;

    let self = this;

    colorsFromUrl(
      `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`,
      (err, colors) => {
        if (!err) {
          if (colors.dominantColor === '#CCCCCC') {
            self.setState({ bgColor: colors.dominantColor });
          } else {
            self.setState({ bgColor: colors.averageColor });
          }
        }
      }
    );
  }

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  playerOnReady = () => this.setState({ isReady: true });

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
    switch (e.state) {
      case 'loading':
        this.player.duration().then(d => this.setState({ duration: d }));
        break;
      case 'playing':
        this.setState({ isPlaying: true });
        break;
      case 'paused':
      case 'stopped':
        this.setState({ isPlaying: false });
        break;
    }
  };

  render() {
    const { cover } = this.props.navigation.state.params;
    const { likedCovers } = this.props;
    let {
      cTime,
      duration,
      isPlaying,
      isReady,
      bgColor,
    } = this.state;

    const isLiked = likedCovers.indexOf(cover.id) > -1;

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
          style={{ alignSelf: 'stretch', height: 200 }}
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
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
            <Text style={styles.metaText}>
              {moment
                .unix(cover.published_at)
                .fromNow()
                .toUpperCase()}{' '}
              BY
            </Text>
            <Text
              style={styles.usernameText}
              onPress={() => alert('Go to profile')}
            >
              {' '}
              {cover.publisher.username.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.detailsRow, { flex: 2 }]}>
            <Text
              style={styles.nameText}
              numberOfLines={2}
              ellipsizeMode={'tail'}
            >
              {cover.name}
            </Text>
          </View>
        </View>
        <View style={[styles.tagsContainer, { backgroundColor: bgColor }]} />
        <View style={styles.actionsContainer}>
          <View style={styles.actionBox}>
            <Icon
              name={'favorite'}
              size={32}
              color={isLiked ? '#C62828' : PRIMARY_COLOR_TEXT}
              containerStyle={{
                marginRight: 5,
              }}
              onPress={() => alert('Pressed')}
            />
            <Text style={styles.likesText}>{abbreviateNumber(1200)}</Text>
          </View>
          <View style={styles.actionBox}>
            <Icon
              name={'share'}
              color={PRIMARY_COLOR_TEXT}
              size={32}
              onPress={() => alert('Pressed')}
            />
          </View>
          <View style={[styles.actionBox, {borderRightWidth: 0}]}>
            <Icon
              name={'add-box'}
              color={PRIMARY_COLOR_TEXT}
              size={32}
              onPress={() => alert('Pressed')}
            />
          </View>
        </View>
      </View>
    );
  }
}

CoverDetailsScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  likedCovers: state.user.likedCovers,
});

export default connect(mapStateToProps)(CoverDetailsScreen);
