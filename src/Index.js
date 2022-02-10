import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {getData, storeData, removeData} from './utils/LocalStorage';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Index = () => {
  const [token, setToken] = useState(null);

  const handleToken = value => {
    if (value === null) removeData();
    else storeData(value);
    setToken(value);
  };

  useEffect(() => {
    // Check async storage if user is logged in
    getData().then(val => setToken(val));
  }, []);

  return (
    <NavigationContainer>
      {token === null ? (
        <AuthStack handleToken={handleToken} />
      ) : (
        <AppStack token={token} handleToken={handleToken} />
      )}
    </NavigationContainer>
  );
};

export default Index;
