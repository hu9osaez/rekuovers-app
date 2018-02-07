import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, normalize } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: (width / 2) - 8,
    height: width * 0.35,
    marginHorizontal: 2,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    width: (width / 2) - 8,
    height: width * 0.35,
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
    fontWeight: 'bold'
  }
});

class MostStarredCard extends React.Component {
  render() {
    const { cover, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CoverDetails', { cover })}
        style={styles.container}>
        <ImageBackground
          source={{ uri: `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`}}
          resizeMode={'cover'}
          style={styles.imageContainer}
        >
          <View style={styles.overlayContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{cover.description}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(MostStarredCard);
