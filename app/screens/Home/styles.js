import { StyleSheet } from 'react-native';
import { robotoWeights } from 'react-native-typography';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';

const { condensedBold } = robotoWeights;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  newestHeader: {
    ...condensedBold,
    fontSize: 16,
    marginLeft: 5,
    marginTop: 10,
  }
});

export default styles;
