import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';

const styles = StyleSheet.create({
  container: {
    height: 199,
    width: 360,
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

class FeaturedCover extends React.Component {
  constructor() {
    super();
    this.state = {
      bgColor: '#cccccc',
    };
  }

  componentWillMount() {
    const { cover } = this.props;

    /*pify(colorsFromUrl)(
      `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`
    ).then(data => {
      this.setState({ bgColor: data.averageColor });
    });*/
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

export default FeaturedCover;
