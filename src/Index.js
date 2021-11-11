import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Index = () => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzY2MzAzNzUsImV4cCI6MTYzNjYzNzU3NSwidXNlcklkIjoxLCJmaXJzdE5hbWUiOiJqb24iLCJsYXN0TmFtZSI6IkFuZHJld3MiLCJlbWFpbCI6ImpvbkBnbWFpbC5jb20ifQ.N3x3dMV1QaL7Mj85rTCKyz1LDhyjXp1Vx1IHyfietYs',
  );

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
