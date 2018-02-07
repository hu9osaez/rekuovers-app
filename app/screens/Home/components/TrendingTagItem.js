import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { systemWeights } from 'react-native-typography';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    marginVertical: 3,
    marginHorizontal: 3,
    justifyContent: 'center',
    borderRadius: 3,
    borderColor: PRIMARY_COLOR_TEXT,
    borderWidth: 1,
  },
  text: {
    color: PRIMARY_COLOR_TEXT,
    marginLeft: 10,
    fontSize: 20,
  }
});

class TrendingTagItem extends React.Component {
  render() {
    const { tag } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => alert('Pressed')}
        style={styles.container}>
        <Text style={[styles.text, systemWeights.thin]}># {tag.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

export default TrendingTagItem;
