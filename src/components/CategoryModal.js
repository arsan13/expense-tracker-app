import React from 'react';
import {Modal, StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import {windowWidth} from '../utils/Dimentions';
import {primaryColor, textColor} from '../utils/GlobalStyle';

const CategoryModal = ({
  payload,
  isUpdate,
  handleSave,
  handleChange,
  handleModalVisibility,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isUpdate ? (
              <Text style={styles.header}>UPDATE CATEGORY</Text>
            ) : (
              <Text style={styles.header}>ADD CATEGORY</Text>
            )}
            <View style={{padding: 20}}>
              <TextInput
                style={styles.input}
                value={payload.title}
                placeholder="Title"
                placeholderTextColor="grey"
                onChangeText={text => handleChange('title', text)}
              />
              <TextInput
                style={styles.input}
                value={payload.description}
                placeholder="Description"
                placeholderTextColor="grey"
                onChangeText={text => handleChange('description', text)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                color={primaryColor}
                mode="contained"
                style={[styles.button, {borderBottomLeftRadius: 20}]}
                onPress={handleSave}>
                Save
              </Button>
              <Button
                color={primaryColor}
                mode="contained"
                style={[styles.button, {borderBottomRightRadius: 20}]}
                onPress={() => handleModalVisibility(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginTop: 20,
    color: textColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 10,
    color: textColor,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    width: windowWidth / 1.5,
  },
  button: {
    width: '50%',
    padding: 5,
    borderRadius: 0,
  },
});

export default CategoryModal;
