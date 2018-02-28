import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSansRegular',
    fontSize: normalize(12),
  },
});

const Text = props => {
  const { children, section, featured, size, ...rest } = props;
  return (
    <RNText
      style={[
        styles.text,
        section && { fontFamily: 'OswaldMedium', fontSize: normalize(16) },
        featured && { fontFamily: 'UbuntuBold', fontSize: normalize(20) },
        size && { fontSize: size },
        style && style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export { Text };
