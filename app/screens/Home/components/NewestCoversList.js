import React from 'react';
import { FlatList, Text, View } from 'react-native';
import NewestCoverCard from './NewestCoverCard';
import { connect } from 'react-redux';

import styles from '../styles';

class NewestCoversList extends React.PureComponent {
  render() {
    const { covers, likedCovers, loading, navigation } = this.props;
    return (
      <View style={styles.containerSection}>
        <View style={styles.newestHeaderContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestHeader}>NEWEST</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.newestSeeMore}
              onPress={() => navigation.navigate('Feed')}
            >
              See more
            </Text>
          </View>
        </View>
        <FlatList
          data={covers.slice(0, 6)}
          refreshing={loading}
          renderItem={({ item }) => {
            const isLiked = likedCovers.indexOf(item.id) > -1;

            return <NewestCoverCard cover={item} isLiked={isLiked} />;
          }}
          keyExtractor={cover => cover.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 8, marginHorizontal: 3 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.newest,
  loading: state.covers.loading,
  likedCovers: state.user.likedCovers,
});

export default connect(mapStateToProps)(NewestCoversList);
