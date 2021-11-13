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
import PieChart from '../components/PieChart';

const HomeScreen = ({handleToken, allCategories, navigation}) => {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const colors = [
    '#EBD22F',
    '#44CD40',
    '#C70039',
    '#404FCD',
    '#1e90ff',
    '#ff7f50',
    '#6a5acd',
  ];

  const handleDateFilter = (type, value) => {
    if (allCategories === null) {
      setCategories(null);
      return;
    }
    let tempCategories = JSON.parse(JSON.stringify(allCategories));
    let filteredCategories = dateFilterHelper(type, value, tempCategories);
    let total = netExpense(filteredCategories);
    filteredCategories = filteredCategories.map((item, index) => {
      item.percentage = Math.round((item.totalExpense / total) * 100);
      item.color = colors[index];
      return item;
    });
    setCategories(filteredCategories);
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
            <PieChart categories={categories} total={total} />
            <Button
              title="Add Transaction"
              onPress={() => {
                navigation.navigate('AddTransactionScreen', {
                  showFutureDates: false,
                });
              }}
            />
          </View>
          <View style={styles.dataContainer}>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                  <Card item={item} />
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
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  chart: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  dataContainer: {
    flex: 4,
    marginHorizontal: 10,
    marginTop: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
