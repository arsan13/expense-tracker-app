import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ErrorScreen from './ErrorScreen';

const HomeScreen = ({handleToken, categories, navigation}) => {
  return (
    <>
      {categories === null ? (
        <ErrorScreen handleToken={handleToken} />
      ) : (
        <View style={styles.container}>
          <Text>Home Screen</Text>
          <Button
            title="Add Transaction"
            onPress={() => {
              navigation.navigate('AddTransactionScreen');
            }}
          />
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
