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
    width: width-40,
    height: width * 0.25,
    marginBottom: 8,
    overflow: 'hidden',
    borderRadius: 10
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    width: width-40,
    height: width * 0.25,
    borderRadius: 10
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
              {song.song_title}
            </Text>
            <Text style={[styles.text, {fontFamily: 'sans-serif-thin'}]}>
              {song.artists.map(a => a.name)}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

/*SongCard.propTypes = {
  song: React.PropTypes.object.isRequired
};*/

export default SongCard;

// @TODO: Motivation to like it
