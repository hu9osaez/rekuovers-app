import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  image: {
    borderRadius: 100,
    width: 120,
    height: 120,
    position: 'absolute',
    right: 20,
    top: 40,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
          self.setState({ bgColor: colors.averageColor });
        }
      }
    );
  }

  render() {
    const { cover } = this.props;
    let { bgColor } = this.state;
    let imgUrl = `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`;

    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Image source={{ uri: imgUrl }} style={styles.image} />
      </View>
    );
  }
}

export default FeaturedCoverSlide;
