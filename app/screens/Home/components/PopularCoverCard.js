import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '@components';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { PRIMARY_COLOR_TEXT, SECONDARY_COLOR_TEXT } from '@core/common/colors';
import { abbreviateNumber } from '@core/utils/text';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: width / 2 - 8,
    height: width * 0.65,
    marginBottom: 3,
    marginHorizontal: 2,
    elevation: 1,
  },
  imageContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    width: width / 2 - 8,
    height: width * 0.55,
  },
  title: {
    color: PRIMARY_COLOR_TEXT,
    paddingLeft: 4,
  },
  extraContainer: {
    flexDirection: 'row',
    height: 20,
    padding: 3,
    paddingLeft: 4,
  },
  textLikes: {
    marginLeft: 4,
    lineHeight: 15,
    color: SECONDARY_COLOR_TEXT,
  },
});

class PopularCoverCard extends React.PureComponent {
  constructor(props) {
    super(props);

    const { cover } = props;

    this.state = {
      imageUrl: `https://img.youtube.com/vi/${
        cover.youtube_id
      }/maxresdefault.jpg`,
    };
  }

  render() {
    const { cover, isLiked, navigation } = this.props;
    const { imageUrl } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CoverDetails', { cover })}
        >
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.imageContainer}
            onError={e =>
              this.setState({
                imageUrl: `https://img.youtube.com/vi/${
                  cover.youtube_id
                }/mqdefault.jpg`,
              })
            }
          />
        </TouchableOpacity>
        <Text
          size={12}
          style={styles.title}
          ellipsizeMode={'tail'}
          numberOfLines={1}
        >
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
            <Text size={10} style={styles.textLikes}>
              {abbreviateNumber(cover.likes)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(PopularCoverCard);
