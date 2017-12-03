import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { BACKGROUND_COLOR, SECONDARY_COLOR_TEXT } from '../utils';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 0.65,
    marginBottom: 2
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: BACKGROUND_COLOR,
    width,
    height: width * 0.55
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 30,
    paddingBottom: 30,
    ...StyleSheet.absoluteFillObject
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 40,
    paddingTop: 8
  },
  text: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 7,
    textAlign: 'center'
  }
});

const SongCard = ({ song, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(song)}>
        <ImageBackground
          source={{uri: `https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`}}
          style={styles.imageContainer}
        >
          <View style={styles.contentContainer}>
            <Text h4 style={[styles.text, {fontFamily: 'sans-serif-medium'}]}>
              {song.title}
            </Text>
            <Text style={[styles.text, {fontFamily: 'sans-serif-thin'}]}>
              {song.artist}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Icon
          name={'favorite-border'}
          color={SECONDARY_COLOR_TEXT}
          containerStyle={{
            marginBottom: 10,
            marginLeft: 7
          }}
        />
        <Text style={{ marginLeft: 5, color: SECONDARY_COLOR_TEXT }}>{song.likes_count}</Text>
      </View>
    </View>
  );
};

/*SongCard.propTypes = {
  song: React.PropTypes.object.isRequired
};*/

export default SongCard;

// @TODO: Motivation to like it
