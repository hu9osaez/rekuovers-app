import React from 'react';
import { ImageBackground as RNImageBG } from 'react-native';

const ImgBackground = ({ source, children }) => (
  <RNImageBG
    source={source}
    style={{
      flex: 1,
      position: 'relative',
      width: null,
      height: null,
    }}
  >
    {children}
  </RNImageBG>
);

export { ImgBackground };
