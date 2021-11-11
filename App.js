import React from 'react';
import Index from './src/Index';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {
  return <Index />;
};

export default App;
