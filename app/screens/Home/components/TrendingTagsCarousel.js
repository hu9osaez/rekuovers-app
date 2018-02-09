import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import TrendingTagItem from './TrendingTagItem';

const { width } = Dimensions.get('window');

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';
import { hexToRGB } from '@core/utils/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAF6',
    alignItems: 'center',
  },
  tagline: {
    textAlign: 'center',
    color: PRIMARY_COLOR_TEXT,
    fontSize: 10,
    borderRadius: 10,
    borderColor: hexToRGB(PRIMARY_COLOR_TEXT, 0.6),
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: 'center',
    marginTop: 15,
  }
});

class TrendingTagsCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [
        {
          name: 'Acapella',
          slug: 'acapella',
        },
        {
          name: 'Fingerstyle',
          slug: 'fingerstyle',
        },
        {
          name: 'Boy Band',
          slug: 'boy-band',
        },
        {
          name: 'Piano',
          slug: 'piano',
        },
        {
          name: 'Mashup',
          slug: 'mashup',
        },
        {
          name: 'Street',
          slug: 'street',
        },
        {
          name: 'Metro',
          slug: 'metro',
        },
        {
          name: 'Saxo',
          slug: 'saxo',
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tagline}>I would like listen something about...</Text>
        <Carousel
          autoplay
          autoplayTimeout={4000}
          loop
          pageSize={width}
          showsPageIndicator={false}
        >
          {this.state.tags.map((tag) => <TrendingTagItem key={tag.slug} tag={tag} />)}
        </Carousel>
      </View>
    );
  }
}

export default TrendingTagsCarousel;
