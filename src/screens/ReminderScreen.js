import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Loading from '../components/Loading';
import ReminderModal from '../components/ReminderModal';
import {textColor} from '../utils/GlobalStyle';

const ReminderScreen = ({reminders, deleteTransaction, updateTransaction}) => {
  const [reminderItem, setReminderItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleReminder = () => {
    const sortedReminders = [...reminders].sort(
      (a, b) => a['transactionDate'] - b['transactionDate'],
    );
    setData(sortedReminders);
    let presentDayReminders = reminders.filter(
      item =>
        new Date(item.transactionDate).toLocaleDateString() ===
        new Date().toLocaleDateString(),
    );
    if (presentDayReminders.length > 0) setReminderItem(presentDayReminders[0]);
  };

  const handleReminderClick = async text => {
    //If reminder txn is paid => update txn remind to false, else delete the txn
    if (text === 'Pay') await handleUpdate();
    else if (text === 'Decline') await handleDelete(reminderItem);
    setReminderItem(null);
  };

  const handleDelete = async transaction => {
    setIsLoading(true);
    const isDeleted = await deleteTransaction(
      transaction.categoryId,
      transaction.id,
    );
    if (!isDeleted) {
      Alert.alert(
        'Unsuccessful!',
        'Error deleting transaction. Please try again later',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    let transaction = {...reminderItem};
    transaction.remind = false;
    const isUpdated = await updateTransaction(
      transaction,
      transaction.categoryId,
      transaction.id,
    );
    if (!isUpdated) {
      console.log('Error updating transaction');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleReminder();
  }, [reminders]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{marginTop: 15, paddingHorizontal: 10}}
      onPress={() => setReminderItem(item)}>
      <Text style={styles.date}>
        {moment(new Date(item.transactionDate)).format('MMMM DD, YYYY')}
      </Text>
      <View style={styles.card}>
        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.color, {backgroundColor: item.color}]} />
          <Text style={{color: textColor, fontSize: 15}}>
            {item.categoryName}
          </Text>
        </View>
        <Text style={[styles.text, {flex: 1}]}>
          {'\u20B9'} {item.amount}
        </Text>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}
          onPress={() => handleDelete(item)}>
          <Icon name="delete" size={25} color="#D11A2A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {reminderItem !== null ? (
            <ReminderModal
              item={reminderItem}
              handleReminderClick={handleReminderClick}
            />
          ) : (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          )}
        </>
      )}
    </>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  date: {
    color: '#696969',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  color: {
    marginRight: 10,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  text: {
    color: textColor,
    alignSelf: 'center',
  },
});
