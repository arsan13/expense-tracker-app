import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HelloWorld = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HelloWorld;
