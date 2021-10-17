import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = ({token, handleToken}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {props => <HomeScreen token={token} handleToken={handleToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
