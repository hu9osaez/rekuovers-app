import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text, normalize } from 'react-native-elements';

import moment from 'moment';

import { PRIMARY_COLOR_TEXT, SECONDARY_COLOR_TEXT } from '@core/common/colors';
import { abbreviateNumber } from '@core/utils/text';

let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width * 0.35,
    marginHorizontal: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2 - 20,
    height: width * 0.25,
  },
  title: {
    fontSize: normalize(12),
    color: PRIMARY_COLOR_TEXT,
  },
  extraContainer: {
    flexDirection: 'row',
    height: 20,
  },
  iconContainer: {

  },
  textLikes: {
    fontSize: normalize(11),
    marginLeft: 4,
    lineHeight: 20,
    color: SECONDARY_COLOR_TEXT
  },
  textTime: {
    fontSize: normalize(10),
    textAlign: 'right',
    lineHeight: 20,
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
      <View style={styles.extraContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Icon name={'favorite'} size={13} containerStyle={styles.iconContainer} />
          <Text style={styles.textLikes}>{abbreviateNumber(cover.likes)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.textTime}>{moment.unix(cover.published_at).fromNow()}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewestCoverCard;
