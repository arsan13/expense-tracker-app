import React from 'react';
import {ActivityIndicator} from 'react-native';
import {primaryColor} from '../utils/GlobalStyle';

const Loading = () => {
  return <ActivityIndicator size="large" color={primaryColor} />;
};

export default Loading;
