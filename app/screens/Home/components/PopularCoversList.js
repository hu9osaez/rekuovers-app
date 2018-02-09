import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PopularCoverCard from './PopularCoverCard';

import { connect } from 'react-redux';
import styles from '../styles';

class PopularCoversList extends React.Component {
  render() {
    const { covers, likedCovers } = this.props;
    return (
      <View style={styles.containerSection}>
        <View style={styles.newestHeaderContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestHeader}>POPULAR</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestSeeMore} onPress={() => alert('Pressed')}>
              Today
            </Text>
          </View>
        </View>
        <FlatList
          data={covers}
          renderItem={({ item }) => {
            const isLiked = likedCovers.indexOf(item.id) > -1;

            return (<PopularCoverCard cover={item} isLiked={isLiked} />);
          }}
          keyExtractor={cover => cover.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 7, marginHorizontal: 3 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.popular,
  likedCovers: state.user.likedCovers,
});

export default connect(mapStateToProps)(PopularCoversList);
