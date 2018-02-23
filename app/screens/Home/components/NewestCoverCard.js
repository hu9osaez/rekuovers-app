import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text, normalize } from 'react-native-elements';

import moment from 'moment';
import { withNavigation } from 'react-navigation';

import { PRIMARY_COLOR_TEXT, SECONDARY_COLOR_TEXT } from '@core/common/colors';
import { abbreviateNumber } from '@core/utils/text';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: width / 2.3 - 5,
    height: width * 0.3,
    marginBottom: 3,
    marginHorizontal: 2,
    elevation: 1,
  },
  imageContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    width: width / 2.3 - 5,
    height: width * 0.2,
  },
  title: {
    fontSize: normalize(11),
    color: PRIMARY_COLOR_TEXT,
    paddingLeft: 3,
  },
  extraContainer: {
    flexDirection: 'row',
    height: 20,
    padding: 3,
  },
  textLikes: {
    fontSize: normalize(10),
    marginLeft: 4,
    lineHeight: 15,
    color: SECONDARY_COLOR_TEXT,
  },
  textTime: {
    fontSize: normalize(9),
    textAlign: 'right',
    lineHeight: 18,
  },
});

class NewestCoverCard extends React.PureComponent {
  render() {
    const { cover, isLiked, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CoverDetails', { cover })}
        >
          <Image
            source={{
              uri: `https://img.youtube.com/vi/${
                cover.youtube_id
              }/mqdefault.jpg`,
            }}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
        <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>
          {cover.name}
        </Text>
        <View style={styles.extraContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <Icon
              name={'favorite'}
              size={13}
              color={isLiked ? '#C62828' : PRIMARY_COLOR_TEXT}
            />
            <Text style={styles.textLikes}>
              {abbreviateNumber(cover.likes)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.textTime}>
              {moment.unix(cover.published_at).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(NewestCoverCard);
