import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({token, navigation, categories}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
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
