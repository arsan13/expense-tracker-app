import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({handleToken}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <LoginScreen handleToken={handleToken} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Sign-up"
        component={SignupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
