import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({categories, navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Add Transaction"
        onPress={() => {
          navigation.navigate('AddTransactionScreen');
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
