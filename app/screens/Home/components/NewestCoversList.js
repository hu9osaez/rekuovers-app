import React from 'react';
import { FlatList, Text, View } from 'react-native';
import TitleHeaderDivider from './TitleHeaderDivider';
import NewestCoverCard from './NewestCoverCard';
import { connect } from 'react-redux';

import styles from '../styles';

class NewestCoversList extends React.PureComponent {
  render() {
    const { covers, loading } = this.props;
    return (
      <View style={styles.containerSection}>
        <View style={styles.newestHeaderContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestHeader}>NEWEST</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.newestSeeMore} onPress={() => alert('Pressed')}>
              See more
            </Text>
          </View>
        </View>
        <TitleHeaderDivider />
        <FlatList
          data={covers.slice(0, 6)}
          refreshing={loading}
          renderItem={({ item }) => <NewestCoverCard cover={item} />}
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
});

export default connect(mapStateToProps)(NewestCoversList);
