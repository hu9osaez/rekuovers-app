import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { systemWeights } from 'react-native-typography';

import { PRIMARY_COLOR } from '@core/common/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    marginVertical: 3,
    marginHorizontal: 3,
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: PRIMARY_COLOR,
  },
  text: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 20,
  }
});

class TrendingTagItem extends React.Component {
  render() {
    const { tag } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => alert('Pressed')}
        style={styles.container}>
        <Text style={[styles.text, systemWeights.thin]}># {tag.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

export default TrendingTagItem;
