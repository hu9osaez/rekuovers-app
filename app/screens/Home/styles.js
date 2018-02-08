import { StyleSheet } from 'react-native';
import { robotoWeights } from 'react-native-typography';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';

const { condensedBold } = robotoWeights;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  containerSection: {
    marginBottom: 12,
  },
  newestHeaderContainer: {
    flexDirection: 'row',
    height: 30,
  },
  newestHeader: {
    ...condensedBold,
    fontSize: 16,
    marginLeft: 5,
    lineHeight: 35,
  },
  newestSeeMore: {
    lineHeight: 30,
    marginRight: 5,
    textAlign: 'right',
  },
});

export default styles;
