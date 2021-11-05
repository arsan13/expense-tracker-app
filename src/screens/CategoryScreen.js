import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import {globalStyle} from '../utils/GlobalStyle';

const CategoryScreen = ({
  categories,
  addCategory,
  deleteCategory,
  updateCategory,
}) => {
  let initialState = {
    title: '',
    description: '',
  };

  const [payload, setPayload] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    if (payload.title.trim() === '') {
      // Add Alert
      setErrMsg('Fill the title');
      setIsLoading(false);
      return;
    }

    let isSuccessful;
    if (isUpdate) {
      isSuccessful = await updateCategory(payload);
      setIsUpdate(false);
    } else {
      isSuccessful = await addCategory(payload);
    }

    if (isSuccessful === true) {
      setPayload(initialState);
    } else {
      //Add Alert
      setErrMsg('Problem occured. Try again');
    }
    setIsLoading(false);
  };

  const handleDelete = async id => {
    const isDeleted = await deleteCategory(id);
    if (isDeleted === false) {
      //Add alert
      console.log('Problem deleting category');
    }
  };

  const handleUpdate = async item => {
    setIsUpdate(true);
    setPayload(item);
  };

  return (
    <View>
      <Text>Categories Screen</Text>
      <View>
        {isLoading ? (
          <View>
            <Loading />
          </View>
        ) : (
          <View>
            <FormInput
              labelValue={payload.title}
              onChangeText={text => handleChange('title', text)}
              placeholderText="Title"
              // iconType="form"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <FormInput
              labelValue={payload.description}
              onChangeText={text => handleChange('description', text)}
              placeholderText="Description"
              // iconType="form"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {errMsg.trim().length !== 0 && (
              <Text style={globalStyle.error}>{errMsg}</Text>
            )}

            <FormButton buttonTitle="Save" onPress={() => handleSubmit()} />
          </View>
        )}
      </View>
      <FlatList
        style={{marginTop: 5}}
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: 'black'}}>{item.title}</Text>
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
              <Button title="Update" onPress={() => handleUpdate(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
