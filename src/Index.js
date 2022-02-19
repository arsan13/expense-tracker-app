import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {getData, storeData, removeData} from './utils/LocalStorage';
import Loading from './components/Loading';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Index = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToken = value => {
    setLoading(true);
    if (value === null) removeData();
    else storeData(value);
    setToken(value);
    setLoading(false);
  };

  useEffect(() => {
    // Check async storage if user is logged in
    (async function () {
      setLoading(true);
      const val = await getData();
      setToken(val);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Loading message="Checking session..." />
      </View>
    );
  }

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
