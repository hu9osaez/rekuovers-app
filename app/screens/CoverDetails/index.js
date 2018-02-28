import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Icon, Slider } from 'react-native-elements';
import { Text } from '@components';
import { colorsFromUrl } from 'react-native-dominant-color';
import YouTube from 'react-native-youtube';
import moment from 'moment';
import timer from 'react-native-timer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { fetchCreateLike, fetchDeleteLike } from '@core/api';
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TEXT,
  SECONDARY_COLOR,
  SECONDARY_COLOR_TEXT,
} from '@core/common/colors';
import { getFontColorByBackground } from '@core/utils/color';
import { abbreviateNumber, secondsToTime } from '@core/utils/text';

import { updateLikesToCover } from '@store/covers/actions';
import { fetchLikedCoversIds } from '@store/user/actions';

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
    color: '#cacaca',
  },
  usernameText: {
    color: PRIMARY_COLOR,
  },
  nameText: {
    fontFamily: 'OswaldMedium',
    fontSize: 16,
    color: PRIMARY_COLOR_TEXT,
  },
  tagsContainer: {
    height: 40,
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
    color: PRIMARY_COLOR_TEXT,
    paddingBottom: 5,
  },
});

class CoverDetailsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const { cover } = props.navigation.state.params;
    const { likedCovers } = props;

    this.state = {
      duration: 0,
      firstPlay: false,
      isPlaying: false,
      isReady: false,
      cTime: 0,
      bgColorTags: '#cccccc',
      fontColorTags: '#000000',
      likesCount: cover.likes,
      isLiked: likedCovers.indexOf(cover.id) > -1,
    };
  }

  async componentDidMount() {
    const { cover } = this.props.navigation.state.params;

    const colors = await colorsFromUrl(
      `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`
    );

    this.setState(
      {
        bgColorTags:
          colors.dominantColor === '#CCCCCC'
            ? colors.dominantColor
            : colors.averageColor,
      },
      () => {
        this.setState({
          fontColorTags: getFontColorByBackground(this.state.bgColorTags),
        });
      }
    );
  }

  componentWillUnmount() {
    timer.clearInterval(this);
  }

  playerOnReady = () =>
    this.setState({ isReady: true }, () => {
      this.togglePlay();
    });

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

  toggleLike = async () => {
    const { accessToken } = this.props;
    const { likesCount, isLiked } = this.state;
    const { cover } = this.props.navigation.state.params;

    this.setState({
      likesCount: isLiked ? likesCount - 1 : likesCount + 1,
      isLiked: !isLiked,
    });

    if (!isLiked) {
      const response = await fetchCreateLike(accessToken, cover.id);

      if (response.success) {
        this.props.fetchLikedCoversIds();
        this.props.updateLikesToCover(cover.id, this.state.likesCount);
      } else {
        // @TODO
        // Show some alert with the error
      }
    } else {
      const response = await fetchDeleteLike(accessToken, cover.id);

      if (response.success) {
        this.props.fetchLikedCoversIds();
        this.props.updateLikesToCover(cover.id, this.state.likesCount);
      } else {
        // @TODO
        // Show some alert with the error
      }
    }
  };

  renderTagsSection() {
    const { cover } = this.props.navigation.state.params;
    const shouldRenderSection = !isEmpty(cover.tags);
    return (
      shouldRenderSection && (
        <View
          style={{
            backgroundColor: this.state.bgColorTags,
            height: 40,
          }}
        >
          <FlatList
            data={cover.tags}
            renderItem={({ item }) => (
              <Text
                featured
                size={16}
                style={{ color: getFontColorByBackground(this.state.bgColorTags) }}
                key={item.slug}
              >
                {item.name.toUpperCase()}
              </Text>
            )}
            keyExtractor={tag => tag.slug}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )
    );
  }

  render() {
    const { cover } = this.props.navigation.state.params;
    let {
      cTime,
      duration,
      isPlaying,
      isReady,
      likesCount,
      isLiked,
    } = this.state;

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
            <Text section size={12} style={styles.metaText}>
              {'PUBLISHED '}
              {moment
                .unix(cover.published_at)
                .fromNow()
                .toUpperCase()}{' '}
              BY
            </Text>
            <Text
              section
              size={12}
              style={styles.usernameText}
              onPress={() => alert('Go to profile')}
            >
              {' '}
              {cover.publisher.name.toUpperCase()}
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
        {this.renderTagsSection()}
        <View style={styles.actionsContainer}>
          <View style={styles.actionBox}>
            <Icon
              name={'favorite'}
              size={32}
              color={isLiked ? '#C62828' : PRIMARY_COLOR_TEXT}
              containerStyle={{
                marginRight: 5,
              }}
              onPress={this.toggleLike}
            />
            <Text section size={24} style={styles.likesText}>
              {abbreviateNumber(likesCount)}
            </Text>
          </View>
          <View style={styles.actionBox}>
            <Icon
              name={'share'}
              color={PRIMARY_COLOR_TEXT}
              size={32}
              onPress={() => alert('Pressed')}
            />
          </View>
          <View style={[styles.actionBox, { borderRightWidth: 0 }]}>
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
  accessToken: state.auth.token,
  likedCovers: state.user.likedCovers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchLikedCoversIds, updateLikesToCover }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CoverDetailsScreen);
