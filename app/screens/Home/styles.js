import { StyleSheet } from 'react-native';

import { PRIMARY_COLOR_TEXT } from '@core/common/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
  },
  containerSection: {
    marginBottom: 10,
  },
  newestHeaderContainer: {
    flexDirection: 'row',
    height: 30,
  },
  newestHeader: {
    marginLeft: 5,
    lineHeight: 35,
  },
  newestSeeMore: {
    lineHeight: 30,
    marginRight: 6,
    textAlign: 'right',
  },
});

export default styles;
