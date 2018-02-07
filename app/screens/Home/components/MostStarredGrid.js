import React from 'react';
import { Text, View, Image } from 'react-native';
import Carousel from 'react-native-banner-carousel';

import { connect } from 'react-redux';

class MostStarredGrid extends React.Component {

  renderItem(cover) {
    return (
      <View>
        <Image
          style={{ width: 360, height: 180 }}
          source={{ uri: `https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg` }}
        />
      </View>
    );
  };

  render() {
    const { covers } = this.props;
    return (
      <View>
        <Text>Most starred</Text>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={360}
        >
          {covers.map((cover) => this.renderItem(cover))}
        </Carousel>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.popular,
});

export default connect(mapStateToProps)(MostStarredGrid);
