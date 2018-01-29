import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainer: {
    position: 'absolute',
    bottom: 80,
  },
  btnContainer: {
    marginLeft: 50,
    marginRight: 50,
  },
  btn: {
    width: width - 100,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  loginText: {
    color: '#ffffff',
    marginTop: 10,
    textAlign: 'center',
  },
  loginTextSecondary: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    padding: 5,
  },
});

export default styles;
