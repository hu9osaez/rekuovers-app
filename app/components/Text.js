import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { normalize } from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSansRegular',
    fontSize: normalize(13),
  },
});

const Text = props => {
  const {
    children,
    light,
    thin,
    section,
    featured,
    size,
    style,
    ...rest
  } = props;
  return (
    <RNText
      style={[
        styles.text,
        thin && { fontFamily: 'sans-serif-thin' },
        light && { fontFamily: 'sans-serif-light' },
        section && { fontFamily: 'OswaldBold', fontSize: normalize(16) },
        featured && { fontFamily: 'UbuntuBold', fontSize: normalize(20) },
        size && { fontSize: normalize(size) },
        style && style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export { Text };
