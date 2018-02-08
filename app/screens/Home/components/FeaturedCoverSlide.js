import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { withNavigation } from 'react-navigation';
import { colorsFromUrl } from 'react-native-dominant-color';
import { robotoWeights, systemWeights } from 'react-native-typography';
import { normalize } from 'react-native-elements/src/index';
const { condensedBold } = robotoWeights;

import { abbreviateNumber } from '@core/utils/text';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: width,
  },
  image: {
    width: width / 2,
    height: 235,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 3,
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleSection: {
    ...condensedBold,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 25,
  },
  descriptionContainer: {
    marginTop: 20,
    marginLeft: 10,
    paddingRight: 3,
    width: 170,
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  likesContainer: {
    height: 17,
    marginLeft: 10,
    marginTop: 10,
    paddingHorizontal: 3,
    flexDirection: 'row',
    width: 45,
  },
  textLikes: {
    color: '#ffffff',
    fontSize: normalize(10),
    paddingLeft: 4,
    paddingTop: 1,
  },
});

class FeaturedCoverSlide extends React.Component {
  constructor() {
    super();
    this.state = {
      bgColor: '#cccccc',
    };
  }

  componentDidMount() {
    const { cover } = this.props;

    let self = this;

    colorsFromUrl(
      `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`,
      (err, colors) => {
        if (!err) {
          if (colors.dominantColor === '#CCCCCC') {
            self.setState({ bgColor: colors.dominantColor });
          } else {
            self.setState({ bgColor: colors.averageColor });
          }
        }
      }
    );
  }

  render() {
    const { cover, navigation } = this.props;
    let { bgColor } = this.state;
    let imgUrl = `https://img.youtube.com/vi/${
      cover.youtube_id
    }/maxresdefault.jpg`;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CoverDetails', { cover })}
        style={[styles.container, { backgroundColor: bgColor }]}
      >
        <Text style={styles.titleSection}>FEATURED COVER</Text>

        <View style={styles.descriptionContainer}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[styles.descriptionText, systemWeights.light]}
          >
            {cover.description}
          </Text>
        </View>

        <View style={styles.likesContainer}>
          <Icon name={'favorite'} size={11} color={'#ffffff'} />
          <Text style={styles.textLikes}>{abbreviateNumber(cover.likes)}</Text>
        </View>

        <Image source={{ uri: imgUrl }} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FeaturedCoverSlide);
