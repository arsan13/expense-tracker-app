import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FormButton from '../components/FormButton';

const ErrorScreen = ({handleToken}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>500</Text>
      <Text style={styles.message}>Internal Server Error</Text>
      <FormButton buttonTitle="Logout" onPress={() => handleToken('')} />
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  code: {
    fontSize: 100,
  },
  message: {
    fontSize: 20,
    marginBottom: 10,
  },
});
