import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    bottom: 30
  },
  btnContainer: {
    marginLeft: 50,
    marginRight: 50
  },
  btn: {
    borderRadius: 3,
    width: width-100,
    marginBottom: 10
  }
});

export default styles;
