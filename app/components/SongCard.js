import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { BACKGROUND_COLOR, SECONDARY_COLOR_TEXT } from 'utils';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 25,
    height: width * 0.25,
    marginHorizontal: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: width / 2 - 10,
    height: width * 0.25,
  },
  contentContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

const SongCard = ({ song, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(song)}>
        <ImageBackground
          source={{
            uri: `https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`,
          }}
          style={styles.imageContainer}
        />
      </TouchableOpacity>
    </View>
  );
};

/*SongCard.propTypes = {
  song: React.PropTypes.object.isRequired
};*/

export default SongCard;

// @TODO: Motivation to like it
