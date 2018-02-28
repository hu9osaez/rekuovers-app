import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@components';
import { PRIMARY_COLOR_TEXT } from '@core/common/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 60,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: PRIMARY_COLOR_TEXT,
    padding: 5,
  },
});

class TrendingTagItem extends React.PureComponent {
  render() {
    const { tag } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => alert('Pressed')}>
          <Text featured style={styles.text}>
            {tag.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TrendingTagItem;
