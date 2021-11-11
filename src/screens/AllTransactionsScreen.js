import React, {useState, useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, View, Alert} from 'react-native';
import DateTypeSelection from '../components/DateTypeSelection';
import ExportToExcel from '../utils/ExportToExcel';
import Loading from '../components/Loading';
import moment from 'moment';

const AllTransactionsScreen = ({route, allTransactions, deleteTransaction}) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateAndType, setdateAndType] = useState([]);

  const handleDateFilter = (type, value) => {
    setdateAndType([type, value]);
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

    await ExportToExcel(dateAndType[0], dateAndType[1], data);
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
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </View>
      ) : (
        <View style={{flex: 1}}>
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
          {route === undefined && (
            <View style={styles.dateContainer}>
              <DateTypeSelection sendDateToHome={handleDateFilter} />
            </View>
          )}
          <View style={styles.dataContainer}>
            <FlatList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.dataItems}>
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
          </View>
        </View>
      )}
    </>
  );
};

export default AllTransactionsScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dateContainer: {
    flex: 2,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dataContainer: {
    marginVertical: 10,
    flex: 12,
  },
  dataItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
});
