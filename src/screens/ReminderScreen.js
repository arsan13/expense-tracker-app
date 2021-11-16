import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Loading from '../components/Loading';
import ReminderModal from '../components/ReminderModal';
import {textColor} from '../utils/GlobalStyle';
import {checkReminder} from '../utils/HandleExpenses';

const ReminderScreen = ({
  navigation,
  reminders,
  deleteTransaction,
  updateTransaction,
}) => {
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
    else await handleDelete(reminderItem);
    setReminderItem(null);
  };

  const handleDelete = async transaction => {
    setIsLoading(true);
    const isDeleted = await deleteTransaction(
      transaction.categoryId,
      transaction.id,
    );
    if (!isDeleted) {
      //Add alert
      console.log('Error deleting transaction');
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    let transaction = {...reminderItem};
    transaction.remind = false;
    const isUpdated = await updateTransaction(transaction);
    if (!isUpdated) {
      //Add alert
      console.log('Error updating transaction');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleReminder();
  }, [reminders]);

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
            <View>
              <View style={{marginVertical: 10}}>
                <Button
                  title="Add Reminder"
                  onPress={() => {
                    navigation.navigate('AddReminder', {showFutureDates: true});
                  }}
                />
              </View>
              <View style={styles.dataContainer}>
                <FlatList
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <View style={styles.dataItems}>
                      <View>
                        <Text style={{color: textColor}}>
                          {item.categoryName}
                        </Text>
                        <Text style={{color: textColor}}>
                          Date: {new Date(item.transactionDate).toDateString()}
                        </Text>
                        <Text style={{color: textColor}}>
                          Amount: {item.amount}
                        </Text>
                        {item.note.trim() !== '' && (
                          <Text style={{color: textColor}}>
                            Note: {item.note}
                          </Text>
                        )}
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
      )}
    </>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  dataContainer: {
    marginVertical: 10,
  },
  dataItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
});
