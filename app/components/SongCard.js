import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from 'react-native-elements';
import { BACKGROUND_COLOR, SECONDARY_COLOR_TEXT } from 'utils';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: (width/2)-30,
    height: width * 0.25,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderRadius: 5,
    elevation: 2
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    width: (width/2)-30,
    height: width * 0.15,
    borderRadius: 10
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  text: {
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
          <View style={styles.contentContainer} />
        </ImageBackground>
        <Text style={styles.text}>{song.song_title}</Text>
      </TouchableOpacity>
    </View>
  );
};

/*SongCard.propTypes = {
  song: React.PropTypes.object.isRequired
};*/

export default SongCard;

// @TODO: Motivation to like it
