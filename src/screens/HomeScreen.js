import React, {useState, useEffect} from 'react';
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
import {
  getAllTransactions,
  netExpense,
  dateFilterHelper,
} from '../utils/HandleExpenses';
import Card from '../components/Card';

const HomeScreen = ({handleToken, allCategories, navigation}) => {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const handleDateFilter = (type, value) => {
    let tempCategories = JSON.parse(JSON.stringify(allCategories));
    const filteredCategories = dateFilterHelper(type, value, tempCategories);
    setCategories(filteredCategories);
    let total = netExpense(filteredCategories);
    setTotal(total);
  };

  const handleCategoryPress = value => {
    let category = [value];
    let transactions = getAllTransactions(category);
    navigation.navigate('AllTransactionsScreen', {
      transactions: transactions,
    });
  };

  useEffect(() => {
    // handleCategory();
    handleDateFilter('Month', new Date());
  }, [allCategories]);

  return (
    <>
      {categories === null ? (
        <ErrorScreen handleToken={handleToken} />
      ) : (
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <DateTypeSelection sendDateToHome={handleDateFilter} />
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
                    <Text>
                      {Math.round((item.totalExpense / total) * 100)} %
                    </Text>
                    <Text>{item.totalExpense}</Text>
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
  dateContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  chart: {
    flex: 3,
    backgroundColor: 'grey',
  },
  dataContainer: {
    flex: 4,
  },
});
