import React, {useState, useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import DateTypeSelection from '../components/DateTypeSelection';
import ExportToExcel from '../utils/ExportToExcel';
import Loading from '../components/Loading';
import moment from 'moment';

const AllTransactionsScreen = ({route, allTransactions, deleteTransaction}) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateAndtype, setDateAndType] = useState([]);

  const handleDateFilter = (type, value) => {
    setDateAndType([type, value]);
    switch (type) {
      case 'Day':
        setTransactions(
          allTransactions.filter(
            item =>
              new Date(item.transactionDate).toLocaleDateString() ===
              value.toLocaleDateString(),
          ),
        );
        break;
      case 'Month':
        setTransactions(
          allTransactions.filter(item => {
            let date = new Date(item.transactionDate);
            return (
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear()
            );
          }),
        );
        break;
      case 'Year':
        setTransactions(
          allTransactions.filter(
            item => new Date(item.transactionDate).getFullYear() === value,
          ),
        );
        break;
    }
  };

  const sortTransactions = property => {
    const sortedData = [...transactions].sort(
      (a, b) => b[property] - a[property],
    );
    setTransactions(sortedData);
  };

  const handleExport = async () => {
    if (transactions.length < 1) return;
    setIsLoading(true);

    //Covert transactionDate, rename key names and remove id(transaction) and categoryId
    let data = JSON.parse(JSON.stringify(transactions));
    for (let item of data) {
      item.date = moment(new Date(item.transactionDate)).format('DD-MMM-YYYY');
      item.category = item.categoryName;
      delete item.transactionDate;
      delete item.id;
      delete item.categoryId;
      delete item.categoryName;
    }

    await ExportToExcel(dateAndtype[0], dateAndtype[1], data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (route === undefined) handleDateFilter('Month', new Date());
    else setTransactions(route.params.transactions);
  }, []);

  const handleDelete = async transaction => {
    setIsLoading(true);
    const isDeleted = await deleteTransaction(
      transaction.categoryId,
      transaction.id,
    );
    if (isDeleted) {
      setTransactions(transactions.filter(item => item.id !== transaction.id));
    } else {
      //Add alert
      console.log('Error deleting transaction');
    }
    setIsLoading(false);
  };

  return (
    <View>
      <View style={styles.header}>
        <Button
          title="Sort by date"
          onPress={() => sortTransactions('transactionDate')}
        />
        <Button
          title="Sort by amount"
          onPress={() => sortTransactions('amount')}
        />
        <Button title="Export" onPress={handleExport} />
      </View>
      <View style={styles.dateContainer}>
        {route === undefined && (
          <DateTypeSelection sendDateToHome={handleDateFilter} />
        )}
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.dataContainer}>
              <View>
                <Text style={{fontSize: 15}}>{item.categoryName}</Text>
                <Text>
                  Date: {new Date(item.transactionDate).toDateString()}
                </Text>
                <Text>Amount: {item.amount}</Text>
                {item.note.trim() !== '' && <Text>Note: {item.note}</Text>}
              </View>
              <View style={{justifyContent: 'center'}}>
                <Button
                  title="Delete"
                  onPress={() => {
                    handleDelete(item);
                  }}
                />
              </View>
              {/* <View style={{borderBottomWidth: 1, marginTop: 10}} /> */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AllTransactionsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dateContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
});
