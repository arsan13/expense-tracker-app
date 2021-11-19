import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-paper';
import moment from 'moment';
import DatePicker from '../components/DatePicker';
import Loading from '../components/Loading';
import {
  globalStyle,
  primaryColor,
  secondaryColor,
  textColor,
} from '../utils/GlobalStyle';

const AddTransactionScreen = ({
  navigation,
  route,
  categories,
  addTransaction,
}) => {
  // showFutureDates === true, reminder txn, else regular txn
  const showFutureDates = route.params.showFutureDates;
  let initialState = {
    amount: 0,
    note: '',
    transactionDate: new Date().getTime(),
    remind: false,
  };

  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [payload, setPayload] = useState(initialState);
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const dateToString = date => {
    return moment(date).format('DD/MM');
  };

  const handleSelectDate = inDate => {
    setShowDatePicker(false);
    setSelectedDate(inDate);
    setPayload({...payload, transactionDate: inDate.getTime()});
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    //Validation
    if (validate() === false) {
      setIsLoading(false);
      return;
    }

    //To add a reminder txn
    let payloadToSend = {...payload};
    if (showFutureDates) payloadToSend.remind = true;

    const isSuccessful = await addTransaction(payloadToSend, categoryId);
    if (isSuccessful) {
      setCategoryId(null);
      setPayload(initialState);
      setErrMsg('');
      setIsLoading(false);
      navigation.goBack();
    } else {
      setErrMsg('Error adding transaction. Please try again later.');
      setIsLoading(false);
    }
  };

  const validate = () => {
    if (payload.amount <= 0) {
      setErrMsg('Amount must be greater than 0');
      return false;
    }
    if (categoryId === null) {
      setErrMsg('Please select the category');
      return false;
    }
    return true;
  };

  return (
    <View>
      {isLoading ? (
        <View>
          <Loading />
        </View>
      ) : (
        <View style={{padding: 10}}>
          {/* FlatList is used to prevent the following warning:
          VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.  */}
          <FlatList
            ListHeaderComponent={
              <>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    // value={payload.amount.toString()}
                    style={{
                      backgroundColor: '#fff',
                      width: 100,
                      borderBottomWidth: 2,
                      fontSize: 20,
                      textAlign: 'center',
                    }}
                    autoFocus={true}
                    placeholder="INR"
                    keyboardType="numeric"
                    onChangeText={text => handleChange('amount', text)}
                  />
                </View>
                <Text style={[styles.heading, {marginTop: 10}]}>
                  Categories
                </Text>
              </>
            }
            numColumns={4}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setCategoryId(item.id)}
                style={[
                  styles.categoryBox,
                  {borderColor: item.color},
                  (index === 0 || index % 3 !== 0) && {marginRight: 10},
                  categoryId === item.id && {backgroundColor: item.color},
                ]}>
                {item.title.length > 10 ? (
                  <Text style={styles.categoryText}>
                    {item.title.slice(0, 8) + '...'}
                  </Text>
                ) : (
                  <Text style={styles.categoryText}>{item.title}</Text>
                )}
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <>
                <View style={{marginVertical: 10}}>
                  <Text style={styles.heading}>Date</Text>
                  <View style={styles.dateContainer}>
                    <View style={styles.dateBoxes}>
                      <TouchableOpacity
                        onPress={() => handleSelectDate(today)}
                        style={[
                          styles.dateBox,
                          selectedDate.toLocaleDateString() ===
                            today.toLocaleDateString() && {
                            backgroundColor: secondaryColor,
                          },
                        ]}>
                        <View style={styles.textContainer}>
                          <Text style={styles.dateText}>
                            {dateToString(today)}
                          </Text>
                          <Text style={styles.dateText}>Today</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSelectDate(yesterday)}
                        style={[
                          styles.dateBox,
                          {marginHorizontal: 30},
                          selectedDate.toLocaleDateString() ===
                            yesterday.toLocaleDateString() && {
                            backgroundColor: secondaryColor,
                          },
                        ]}>
                        <View style={styles.textContainer}>
                          <Text style={styles.dateText}>
                            {dateToString(yesterday)}
                          </Text>
                          <Text style={styles.dateText}>Yes'day</Text>
                        </View>
                      </TouchableOpacity>
                      {selectedDate.toLocaleDateString() !==
                        today.toLocaleDateString() &&
                        selectedDate.toLocaleDateString() !==
                          yesterday.toLocaleDateString() && (
                          <TouchableOpacity
                            style={[
                              styles.dateBox,
                              {backgroundColor: secondaryColor},
                            ]}>
                            <View style={styles.textContainer}>
                              <Text style={styles.dateText}>
                                {dateToString(selectedDate)}
                              </Text>
                              <Text style={styles.dateText}>Selected</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity
                      style={styles.calendarIcon}
                      onPress={() => {
                        setShowDatePicker(true);
                      }}>
                      <FontAwesome
                        name="calendar"
                        size={25}
                        color={primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                  {showDatePicker && (
                    <DatePicker
                      handleSelectDate={handleSelectDate}
                      showFutureDates={showFutureDates}
                    />
                  )}
                </View>
                <View style={{marginVertical: 10}}>
                  <Text style={styles.heading}>Note</Text>
                  <TextInput
                    value={payload.note}
                    style={styles.note}
                    placeholder="Comment"
                    onChangeText={text => handleChange('note', text)}
                  />
                </View>

                {errMsg.trim().length !== 0 && (
                  <Text style={globalStyle.error}>{errMsg}</Text>
                )}

                <Button
                  mode="contained"
                  color={primaryColor}
                  style={styles.addButton}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </>
            }
          />
        </View>
      )}
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  heading: {
    color: textColor,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
  },
  categoryBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    width: 85,
    backgroundColor: '#fff',
  },
  categoryText: {
    color: textColor,
    textAlign: 'center',
    paddingVertical: 5,
  },
  dateContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateBox: {
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  dateText: {
    color: textColor,
  },
  calendarIcon: {
    paddingVertical: 12,
    marginRight: 3,
  },
  note: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 5,
    marginTop: 10,
    // borderRadius: 10,
    // alignSelf: 'center',
  },
});
