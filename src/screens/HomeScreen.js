import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({token, handleToken}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>{token}</Text>
      <Button
        title="Logout"
        onPress={() => {
          handleToken('');
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
