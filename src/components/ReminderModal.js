import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {primaryColor, textColor} from '../utils/GlobalStyle';

const ReminderModal = ({item, handleReminderClick}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleClick = text => {
    setModalVisible(false);
    handleReminderClick(text);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              size={20}
              name="close-circle-outline"
              onPress={() => handleClick('Close')}
              style={styles.closeIcon}
            />
            <View style={styles.content}>
              <Text style={styles.amount}>
                {'\u20B9'}
                {item.amount}
              </Text>
              {item.categoryName.length <= 10 && item.note.length <= 10 ? (
                <Text style={styles.modalText}>
                  {item.categoryName} - {item.note}
                </Text>
              ) : (
                <>
                  <Text style={styles.modalText}>{item.categoryName}</Text>
                  {item.note.length <= 20 ? (
                    <Text style={[styles.modalText, {fontSize: 15}]}>
                      {item.note}
                    </Text>
                  ) : (
                    <Text style={[styles.modalText, {fontSize: 15}]}>
                      {item.note}...
                    </Text>
                  )}
                </>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                color={primaryColor}
                mode="contained"
                style={[styles.button, {borderBottomLeftRadius: 20}]}
                onPress={() => handleClick('Pay')}>
                Pay
              </Button>
              <Button
                color={primaryColor}
                mode="contained"
                style={[styles.button, {borderBottomRightRadius: 20}]}
                onPress={() => handleClick('Decline')}>
                Decline
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
  closeIcon: {
    color: 'black',
    alignSelf: 'flex-end',
    paddingRight: 4,
    paddingTop: 4,
  },
  content: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  modalText: {
    textAlign: 'center',
    color: textColor,
    fontSize: 18,
    marginBottom: 5,
  },
  amount: {
    fontSize: 35,
    marginBottom: 10,
    textAlign: 'center',
    color: textColor,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: '35%',
    borderRadius: 0,
  },
});

export default ReminderModal;
