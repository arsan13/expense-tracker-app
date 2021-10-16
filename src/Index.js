import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import HomeStack from './navigation/HomeStack';

const Index = () => {
  const [token, setToken] = useState('');

  return (
    <NavigationContainer>
      {token.length === 0 ? <AuthStack /> : <HomeStack />}
    </NavigationContainer>
  );
};

export default Index;
