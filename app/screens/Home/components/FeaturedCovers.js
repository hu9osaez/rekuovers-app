import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import FeaturedCoverSlide from './FeaturedCoverSlide';

import { connect } from 'react-redux';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: 235,
  },
  pageIndicatorStyle: {
    backgroundColor: 'rgba(255,255,255, 0.3)',
  },
  activePageIndicatorStyle: {
    backgroundColor: 'rgba(255,255,255, 0.4)',
  },
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
          activePageIndicatorStyle={styles.activePageIndicatorStyle}
          pageIndicatorStyle={styles.pageIndicatorStyle}
        >
          {covers.map(cover => <FeaturedCoverSlide key={cover.id} cover={cover} />)}
        </Carousel>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.newest,
});

export default connect(mapStateToProps)(FeaturedCovers);
