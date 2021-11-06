import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Index = () => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzYxNzM0NTQsImV4cCI6MTYzNjE4MDY1NCwidXNlcklkIjoxLCJmaXJzdE5hbWUiOiJqb24iLCJsYXN0TmFtZSI6IkFuZHJld3MiLCJlbWFpbCI6ImpvbkBnbWFpbC5jb20ifQ.9bUGdorM1THYq8LJ6munil31FIQaNCR4BuHKR1kEvb4',
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
