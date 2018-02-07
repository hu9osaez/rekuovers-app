import React from 'react';
import { FlatList, Text, View } from 'react-native';
import NewestCoverCard from './NewestCoverCard';
import { connect } from 'react-redux';

import styles from '../styles';

class NewestCoversList extends React.PureComponent {
  render() {
    const { covers, loading } = this.props;
    return(
      <View>
        <Text style={styles.newestHeader}>NEWEST</Text>
        <FlatList
          data={covers.slice(0, 6)}
          refreshing={loading}
          renderItem={({item}) => (
            <NewestCoverCard cover={item} />
          )}
          keyExtractor={cover => cover.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: 7, paddingBottom: 10 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  covers: state.covers.newest,
  loading: state.covers.loading
});

export default connect(mapStateToProps)(NewestCoversList);
