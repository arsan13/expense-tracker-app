import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTypeSelection from '../components/DateTypeSelection';
import ErrorScreen from './ErrorScreen';
import {primaryColor} from '../utils/GlobalStyle';
import Card from '../components/Card';

const HomeScreen = ({handleToken, categories, navigation}) => {
  const [date, setDate] = useState(new Date());

  const getSelectedDate = (type, value) => {
    console.log(type, value);
    setDate(value);
  };

  const handleCategoryPress = value => {
    navigation.navigate('AllTransactionsScreen', {
      categoryName: value.title,
      transactions: value.transactions,
    });
  };

  return (
    <>
      {categories === null ? (
        <ErrorScreen handleToken={handleToken} />
      ) : (
        <View style={styles.container}>
          <View style={styles.dates}>
            <DateTypeSelection sendDateToHome={getSelectedDate} />
          </View>
          <View style={styles.chart}>
            <Text>Chart</Text>
            <Button
              title="Add Transaction"
              onPress={() => {
                navigation.navigate('AddTransactionScreen');
              }}
            />
          </View>
          <View style={styles.dataContainer}>
            <FlatList
              style={{padding: 10}}
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                  <Card>
                    <Text>{item.title}</Text>
                  </Card>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 2,
    flex: 1,
  },
  dates: {flex: 1, paddingHorizontal: 10},
  chart: {flex: 3, backgroundColor: 'yellow'},
  dataContainer: {flex: 4},
});
