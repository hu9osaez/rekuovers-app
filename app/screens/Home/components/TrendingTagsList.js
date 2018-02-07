import React from 'react';
import { FlatList, Text, View } from 'react-native';
import TitleHeaderDivider from './TitleHeaderDivider';
import TrendingTagItem from './TrendingTagItem';

import { connect } from 'react-redux';
import styles from '../styles';

const tags = [
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
];

class TrendingTagsList extends React.Component {
  render() {
    return (
      <View style={[styles.containerSection, {marginBottom: 0}]}>
        <View style={styles.newestHeaderContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestHeader}>TRENDING TAGS</Text>
          </View>
        </View>
        <TitleHeaderDivider />
        <FlatList
          data={tags}
          renderItem={({ item }) => <TrendingTagItem tag={item} />}
          keyExtractor={tag => tag.slug}
          numColumns={2}
          style={{ paddingBottom: 10, marginHorizontal: 3 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(TrendingTagsList);
