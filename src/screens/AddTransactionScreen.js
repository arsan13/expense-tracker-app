import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View, Button} from 'react-native';
import DatePicker from '../components/DatePicker';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import {globalStyle} from '../utils/GlobalStyle';

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
  const [payload, setPayload] = useState(initialState);
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const handleSelectDate = selectedDate => {
    setShowDatePicker(false);
    setDate(selectedDate);
    setPayload({...payload, transactionDate: selectedDate.getTime()});
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
      setErrMsg('Error adding transaction. Try again');
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
        <View>
          <FormInput
            labelValue={payload.amount.toString()}
            onChangeText={text => handleChange('amount', text)}
            placeholderText="Amount"
            // iconType="form"
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
          />
          {categoryId !== null && (
            <Text style={{fontSize: 15, color: 'black'}}>
              Category: {categoryId}
            </Text>
          )}
          <FlatList
            style={{marginVertical: 5}}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View>
                <Text
                  style={{fontSize: 20, color: 'black'}}
                  onPress={() => setCategoryId(item.id)}>
                  {item.title}
                </Text>
              </View>
            )}
          />
          <Button
            title="Select Date"
            onPress={() => {
              setShowDatePicker(true);
            }}
          />
          {date !== undefined && (
            <Text style={{fontSize: 15, color: 'black'}}>
              {date.toLocaleDateString()}
            </Text>
          )}
          {showDatePicker && (
            <DatePicker
              handleSelectDate={handleSelectDate}
              showFutureDates={showFutureDates}
            />
          )}
          <FormInput
            labelValue={payload.note}
            onChangeText={text => handleChange('note', text)}
            placeholderText="Note"
            // iconType="form"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}

          <FormButton buttonTitle="Add" onPress={() => handleSubmit()} />
        </View>
      )}
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({});
