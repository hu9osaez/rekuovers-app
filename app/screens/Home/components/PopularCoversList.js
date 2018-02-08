import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PopularCoverTile from './PopularCoverTile';

import { connect } from 'react-redux';
import styles from '../styles';

class PopularCoversList extends React.Component {
  render() {
    const { covers } = this.props;
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
          renderItem={({ item }) => <PopularCoverTile cover={item} />}
          keyExtractor={cover => cover.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingBottom: 10, marginHorizontal: 3 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.popular,
});

export default connect(mapStateToProps)(PopularCoversList);
