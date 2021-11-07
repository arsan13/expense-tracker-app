import React from 'react';
import Index from './src/Index';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);

const App = () => {
  return <Index />;
};

export default App;
