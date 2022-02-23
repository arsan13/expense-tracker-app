import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {Button} from 'react-native-paper';
import DateTypeSelection from '../components/DateTypeSelection';
import {
  getAllTransactions,
  netExpense,
  dateFilterHelper,
} from '../utils/HelperFunctions';
import Card from '../components/Card';
import PieChart from '../components/PieChart';
import {primaryColor} from '../utils/GlobalStyle';

const HomeScreen = ({reload, allCategories, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());

  const {portrait} = useDeviceOrientation();

  const onRefresh = () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  };

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

  const handleButtonPress = () => {
    navigation.navigate('AddTransactionScreen', {
      name: 'Add Transaction',
      showFutureDates: false,
    });
  };

  useEffect(() => {
    setDate(new Date());
    handleDateFilter('Month', new Date());
  }, [allCategories]);

  return (
    <View style={styles.container}>
      <View style={[styles.dateContainer, !portrait && {flex: 4}]}>
        <DateTypeSelection date={date} sendDateToHome={handleDateFilter} />
      </View>
      {portrait && (
        <View style={styles.chartAndButton}>
          <PieChart categories={categories} total={total} />
          <Button
            icon="plus-thick"
            color={primaryColor}
            mode="contained"
            style={{width: '90%', padding: 2}}
            onPress={handleButtonPress}>
            Add Transaction
          </Button>
        </View>
      )}
      <View style={styles.dataContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
              <Card item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 2,
    flex: 1,
  },
  dateContainer: {
    flex: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    // paddingBottom: 10,
  },
  chartAndButton: {
    flex: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  dataContainer: {
    flex: 7,
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
