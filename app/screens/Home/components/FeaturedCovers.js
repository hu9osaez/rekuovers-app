import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import FeaturedCoverSlide from './FeaturedCoverSlide';

import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 200
  }
});

class FeaturedCovers extends React.Component {
  render() {
    const { covers } = this.props;
    return (
      <View style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          pageSize={width}
        >
          {covers.map((cover) => <FeaturedCoverSlide cover={cover} /> )}
        </Carousel>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.popular,
});

export default connect(mapStateToProps)(FeaturedCovers);
