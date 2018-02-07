import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, Text, normalize } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { systemWeights } from 'react-native-typography';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';
import { abbreviateNumber } from '@core/utils/text';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 8,
    height: width * 0.55,
    marginHorizontal: 2,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    width: width / 2 - 8,
    height: width * 0.55,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: normalize(11),
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  likesContainer: {
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 3,
    position: 'absolute',
    left: 5,
    top: 5,
    height: 17,
    justifyContent: 'center',
    paddingHorizontal: 3,
    flexDirection: 'row',
  },
  textLikes: {
    color: '#ffffff',
    fontSize: normalize(10),
    paddingLeft: 3,
  },
});

class PopularCoverTile extends React.Component {
  render() {
    const { cover, navigation } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CoverDetails', { cover })}
        style={styles.container}
      >
        <ImageBackground
          source={{
            uri: `https://img.youtube.com/vi/${
              cover.youtube_id
            }/maxresdefault.jpg`,
          }}
          resizeMode={'cover'}
          style={styles.imageContainer}
        >
          <View style={styles.overlayContainer}>
            <View style={styles.likesContainer}>
              <Icon name={'favorite'} size={11} color={PRIMARY_COLOR_TEXT} />
              <Text style={styles.textLikes}>
                {abbreviateNumber(cover.likes)}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.text, systemWeights.light]}>
                {cover.description}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(PopularCoverTile);
