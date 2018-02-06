import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, normalize } from 'react-native-elements';
import { BACKGROUND_COLOR, SECONDARY_COLOR_TEXT } from '@core/common/colors';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: (width / 2) - 25,
    height: width * 0.30,
    marginHorizontal: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (width / 2) - 25,
    height: width * 0.25,
  },
  title: {
    fontSize: normalize(11),
  },
});

const NewestCoverCard = ({ cover, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(cover)}>
        <ImageBackground
          source={{
            uri: `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`,
          }}
          style={styles.imageContainer}
        />
      </TouchableOpacity>
      <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>
        {cover.description}
      </Text>
    </View>
  );
};

export default NewestCoverCard;
