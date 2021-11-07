import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Index = () => {
  const [token, setToken] = useState('');

  const handleToken = text => {
    setToken(text);
  };

  return (
    <NavigationContainer>
      {token.length === 0 ? (
        <AuthStack handleToken={handleToken} />
      ) : (
        <AppStack token={token} handleToken={handleToken} />
      )}
    </NavigationContainer>
  );
};

export default Index;
