import React, {useState, useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DateTypeSelection from '../components/DateTypeSelection';
import ExportToExcel from '../utils/ExportToExcel';
import Loading from '../components/Loading';
import moment from 'moment';
import {textColor} from '../utils/GlobalStyle';
import TransactionModal from '../components/TransactionModal';

const AllTransactionsScreen = ({
  route,
  navigation,
  allTransactions,
  deleteTransaction,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [tempTransactions, setTempTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateAndType, setdateAndType] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  const hideModal = () => {
    setModalItem(null);
  };

  const handleDateFilter = (type, value) => {
    setdateAndType([type, value]);
    switch (type) {
      case 'Day':
        setTransactions(
          tempTransactions.filter(
            item =>
              new Date(item.transactionDate).toLocaleDateString() ===
              value.toLocaleDateString(),
          ),
        );
        break;
      case 'Month':
        setTransactions(
          tempTransactions.filter(item => {
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
          tempTransactions.filter(
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
      delete item.color;
      delete item.remind;
      delete item.categoryId;
      delete item.categoryName;
    }

    await ExportToExcel(dateAndType[0], dateAndType[1], data);
    setIsLoading(false);
  };

  const handleDelete = async transaction => {
    setIsLoading(true);
    const isDeleted = await deleteTransaction(
      transaction.categoryId,
      transaction.id,
    );
    if (isDeleted) {
      setTransactions(transactions.filter(item => item.id !== transaction.id));
    } else {
      Alert.alert(
        'Error!',
        'Problem deleting transaction. Please try again later.',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    }
    setModalItem(null);
    setIsLoading(false);
  };

  const handleUpdate = transaction => {
    setModalItem(null);
    navigation.navigate('AddTransactionScreen', {
      name: 'Add Transaction',
      transaction: transaction,
      showFutureDates: false,
    });
  };

  useEffect(() => {
    setTempTransactions(
      route.params === undefined ? allTransactions : route.params.transactions,
    );
  }, [allTransactions]);

  useEffect(() => {
    handleDateFilter('Month', new Date());
  }, [tempTransactions]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => setModalItem(item)} style={styles.card}>
      <View style={styles.cardDate}>
        <Text style={styles.text}>
          {moment(new Date(item.transactionDate)).format('DD')}
        </Text>
        <Text style={styles.text}>
          {moment(new Date(item.transactionDate)).format('MMM')}
        </Text>
      </View>
      <View style={styles.cardText}>
        <Text style={styles.text}>{item.categoryName}</Text>
        <Text style={{color: 'grey'}}>
          {item.note === '' ? 'N/A' : item.note}
        </Text>
      </View>
      <View style={styles.cardAmount}>
        <Text style={styles.text}>
          {'\u20B9'}
          {item.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </View>
      ) : (
        <>
          {modalItem !== null ? (
            <TransactionModal
              item={modalItem}
              hideModal={hideModal}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
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

              <View style={styles.dateContainer}>
                <DateTypeSelection sendDateToHome={handleDateFilter} />
              </View>

              <View style={styles.dataContainer}>
                <FlatList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                />
              </View>
            </View>
          )}
        </>
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
    justifyContent: 'center',
  },
  dataContainer: {
    marginHorizontal: 15,
    flex: 12,
  },
  dataItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    color: textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDate: {
    flex: 1,
  },
  cardText: {
    flex: 6,
    // backgroundColor: 'green',
  },
  cardAmount: {
    flex: 2,
    alignItems: 'flex-end',
  },
});
