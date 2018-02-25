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
import { systemWeights } from 'react-native-typography';
import { normalize } from 'react-native-elements/src/index';

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
  },
  titleSection: {
    fontFamily: 'OswaldMedium',
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

class FeaturedCoverSlide extends React.PureComponent {
  constructor(props) {
    super(props);

    const { cover } = props;

    this.state = {
      bgColor: '#cccccc',
      imageUrl: `https://img.youtube.com/vi/${
        cover.youtube_id
      }/maxresdefault.jpg`,
    };
  }

  async componentDidMount() {
    const { cover } = this.props;

    const colors = await colorsFromUrl(
      `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`
    );

    if (colors.dominantColor === '#CCCCCC') {
      this.setState({ bgColor: colors.dominantColor });
    } else {
      this.setState({ bgColor: colors.averageColor });
    }
  }

  render() {
    const { cover, navigation } = this.props;
    let { bgColor, imageUrl } = this.state;

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
            {cover.name}
          </Text>
        </View>

        <View style={styles.likesContainer}>
          <Icon name={'favorite'} size={11} color={'#ffffff'} />
          <Text style={styles.textLikes}>{abbreviateNumber(cover.likes)}</Text>
        </View>

        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.image}
          onError={e =>
            this.setState({
              imageUrl: `https://img.youtube.com/vi/${
                cover.youtube_id
              }/mqdefault.jpg`,
            })
          }
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(FeaturedCoverSlide);
