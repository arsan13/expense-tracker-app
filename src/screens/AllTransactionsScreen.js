import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDeviceOrientation} from '@react-native-community/hooks';
import Loading from '../components/Loading';
import {primaryColor, textColor} from '../utils/GlobalStyle';
import ExportToExcel from '../utils/ExportToExcel';
import TransactionModal from '../components/TransactionModal';
import DateTypeSelection from '../components/DateTypeSelection';

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
  const [date, setDate] = useState(new Date());

  const {landscape} = useDeviceOrientation();

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
    setIsLoading(true);

    //Covert transactionDate, rename key names and remove unnecessary fields
    let data = JSON.parse(JSON.stringify(transactions));
    for (let item of data) {
      item.date = moment(new Date(item.transactionDate)).format('DD-MMM-YYYY');
      if (item.note.trim() === '') item.note = 'null';
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

  const showDialog = () => {
    if (transactions.length < 1) {
      Alert.alert('Error!', 'No data found', [{text: 'Cancel'}]);
      return;
    }
    let dateValue = dateAndType[1];
    if (dateAndType[0] === 'Day') dateValue = dateValue.toLocaleDateString();
    else if (dateAndType[0] === 'Year') dateValue = 'year ' + dateValue;
    else dateValue = moment(dateValue).format('MMMM, YYYY');
    Alert.alert('Confirmation!', 'Export data of ' + dateValue, [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => handleExport()},
    ]);
  };

  useEffect(() => {
    if (route.params === undefined) setTempTransactions(allTransactions);
    else setTransactions(route.params.transactions);
  }, [route.params === undefined ? allTransactions : transactions]);

  useEffect(() => {
    handleDateFilter('Month', new Date());
  }, [tempTransactions]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => showDialog()}>
          <Icon name="file-export-outline" size={30} color={primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, [transactions]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => setModalItem(item)} style={styles.card}>
      <View style={styles.cardDate}>
        <View>
          <Text style={styles.text}>
            {moment(new Date(item.transactionDate)).format('DD')}
          </Text>
          <Text style={styles.text}>
            {moment(new Date(item.transactionDate)).format('MMM')}
          </Text>
        </View>
        <View style={styles.divider} />
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
              {route.params === undefined && (
                <View style={[styles.dateContainer, landscape && {flex: 2}]}>
                  <DateTypeSelection
                    date={date}
                    sendDateToHome={handleDateFilter}
                  />
                </View>
              )}

              <View style={[styles.dataContainer, landscape && {flex: 3}]}>
                <FlatList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                />
              </View>

              <View style={[styles.footer, landscape && {flex: 1}]}>
                <TouchableOpacity
                  style={[styles.sortButtons, styles.buttonDivider]}
                  onPress={() => sortTransactions('transactionDate')}>
                  <Text style={styles.footerText}>Sort by Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sortButtons}
                  onPress={() => sortTransactions('amount')}>
                  <Text style={styles.footerText}>Sort by Amount</Text>
                </TouchableOpacity>
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
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    backgroundColor: '#fff',
  },
  sortButtons: {
    paddingVertical: 10,
    width: '50%',
  },
  buttonDivider: {
    borderRightWidth: 1,
    borderRightColor: '#D3D3D3',
  },
  footerText: {
    color: textColor,
    textAlign: 'center',
  },
  dateContainer: {
    flex: 2,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dataContainer: {
    flex: 12,
    marginHorizontal: 15,
    marginBottom: 10,
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
    flexDirection: 'row',
  },
  divider: {
    borderRightWidth: 1,
    marginVertical: 3,
    marginHorizontal: 5,
    borderColor: '#D3D3D3',
  },
  cardText: {
    flex: 6,
    marginLeft: 3,
  },
  cardAmount: {
    flex: 2,
    alignItems: 'flex-end',
  },
});
