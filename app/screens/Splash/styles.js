import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, PRIMARY_COLOR_TEXT } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR_TEXT,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 15,
    width: 130,
    height: 130,
  },
  isotipe: {
    width: 90,
    height: 100,
  },
});

export default styles;
