import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import {globalStyle} from '../utils/GlobalStyle';

const CategoryScreen = ({categories, addCategory}) => {
  let initialState = {
    title: '',
    description: '',
  };

  const [payload, setPayload] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    if (payload.title.trim() === '') {
      setErrMsg('Fill the title');
      setIsLoading(false);
      return;
    }

    const isAdded = await addCategory(payload);
    if (isAdded === true) {
      setPayload(initialState);
    } else {
      setErrMsg('Problem occured. Try again');
    }
    setIsLoading(false);
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
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
