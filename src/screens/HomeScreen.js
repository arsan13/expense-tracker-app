import React, {useState, useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {getService} from '../utils/Api';

const HomeScreen = ({token, handleToken}) => {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      let data = await getService('getAllCategories', token);
      setCategories(data);
      console.log(categories[0].transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCategories = () => {
    fetchAllCategories();
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={() => {
          handleToken('');
        }}
      />
      <Button
        title="Categories"
        onPress={() => {
          handleGetCategories();
        }}
      />
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
