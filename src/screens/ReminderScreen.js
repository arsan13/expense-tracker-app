import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Loading from '../components/Loading';
import ReminderModal from '../components/ReminderModal';
import {checkReminder} from '../utils/HandleExpenses';

const ReminderScreen = ({navigation, reminders, deleteTransaction}) => {
  const [reminderItem, setReminderItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleReminderItem = () => {
    setReminderItem(null);
  };

  useEffect(() => {
    setData(reminders);
    setReminderItem(checkReminder(reminders));
  }, [reminders]);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {reminderItem !== null ? (
            <ReminderModal
              item={reminderItem}
              handleReminderItem={handleReminderItem}
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
                        <Text style={{fontSize: 15}}>{item.categoryName}</Text>
                        <Text>
                          Date: {new Date(item.transactionDate).toDateString()}
                        </Text>
                        <Text>Amount: {item.amount}</Text>
                        {item.note.trim() !== '' && (
                          <Text>Note: {item.note}</Text>
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
