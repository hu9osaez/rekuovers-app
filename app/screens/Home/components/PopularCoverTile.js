import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text, normalize } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { systemWeights } from 'react-native-typography';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';
import { abbreviateNumber } from '@core/utils/text';
import moment from 'moment/moment';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    width: width / 2 - 8,
    height: width * 0.65,
    marginBottom: 3,
    marginHorizontal: 2,
    elevation: 1,
  },
  imageContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    justifyContent: 'center',
    width: width / 2 - 8,
    height: width * 0.55,
  },
  title: {
    fontSize: normalize(11),
    color: PRIMARY_COLOR_TEXT,
    paddingLeft: 3,
  },
});

class PopularCoverTile extends React.Component {
  render() {
    const { cover, navigation } = this.props;
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
              }/maxresdefault.jpg`,
            }}
            style={styles.imageContainer}
          />
        </TouchableOpacity>
        <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>
          {cover.description}
        </Text>
      </View>
    );
  }
}

export default withNavigation(PopularCoverTile);
