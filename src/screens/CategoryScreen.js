import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryModal from '../components/CategoryModal';
import Loading from '../components/Loading';
import {windowWidth} from '../utils/Dimentions';
import {globalStyle, primaryColor} from '../utils/GlobalStyle';
import {textColor} from '../utils/GlobalStyle';

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

  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState(categories);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = text => {
    setData(
      categories.filter(
        item => item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1,
      ),
    );
  };

  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const handleModalVisibility = flag => {
    setPayload(initialState);
    setModalVisible(flag);
  };

  const handleSubmit = async () => {
    setModalVisible(false);
    setIsLoading(true);

    if (payload.title.trim() === '') {
      setErrMsg('Fill the title.');
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
      setErrMsg('Problem occured. Please try again later.');
    }
    setIsLoading(false);
  };

  const handleDelete = async id => {
    setIsLoading(true);
    const isDeleted = await deleteCategory(id);
    if (isDeleted === false) {
      Alert.alert(
        'Error!',
        'Problem deleting category. Please try again later.',
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

  const handleUpdate = item => {
    setIsUpdate(true);
    setPayload(item);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setIsUpdate(false);
    setPayload(initialState);
    setModalVisible(true);
  };

  useEffect(() => {
    setData(categories);
    return () => {
      setData([]);
    };
  }, [categories]);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View
        style={{
          flex: 3,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={[styles.color, {backgroundColor: item.color}]} />
        <Text style={{color: textColor, fontSize: 15}}>{item.title}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Icon
          size={25}
          color="#0096FF"
          name="square-edit-outline"
          onPress={() => handleUpdate(item)}
        />
        <Icon
          size={25}
          color="#D11A2A"
          name="delete"
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </View>
      ) : (
        <>
          {modalVisible ? (
            <CategoryModal
              payload={payload}
              isUpdate={isUpdate}
              handleSave={handleSubmit}
              handleChange={handleChange}
              handleModalVisibility={handleModalVisibility}
            />
          ) : (
            <View>
              <View style={styles.header}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="grey"
                  onChangeText={text => handleSearch(text)}
                />
                <Button
                  color={primaryColor}
                  mode="contained"
                  style={{alignSelf: 'center'}}
                  onPress={handleAdd}>
                  Add
                </Button>
              </View>
              {errMsg.trim().length !== 0 && (
                <Text style={globalStyle.error} onPress={() => setErrMsg('')}>
                  {errMsg}
                </Text>
              )}
              <FlatList
                style={{marginTop: 5}}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    color: textColor,
    borderBottomWidth: 1,
    width: windowWidth / 1.4,
    borderBottomColor: '#D3D3D3',
    fontSize: 17,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  color: {
    marginRight: 10,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
