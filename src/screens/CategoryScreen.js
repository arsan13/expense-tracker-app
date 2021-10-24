import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

const CategoryScreen = ({categories}) => {
  return (
    <View>
      <Text>Categories Screen</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
