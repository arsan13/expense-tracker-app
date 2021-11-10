import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = props => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    // borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    // elevation: 3,
  },
  content: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
