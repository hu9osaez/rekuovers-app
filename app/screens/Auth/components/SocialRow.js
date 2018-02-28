import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from '@components';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { connectWithFacebook } from '@store/auth/actions';

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 25,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
});

const SocialRow = ({ connectWithFacebook, navigation, text }) => (
  <TouchableHighlight
    onPress={() => connectWithFacebook(navigation)}
    underlayColor={'rgba(255, 255, 255, 0.3)'}
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon
          color={'#3b5998'}
          name={'facebook-square'}
          type={'font-awesome'}
        />
        <View style={styles.textContainer}>
          <Text light size={18}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default connect(null, { connectWithFacebook })(
  withNavigation(SocialRow)
);
