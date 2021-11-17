import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import DatePicker from './DatePicker';
import MonthYearPicker from './MonthYearPicker';
import YearPicker from './YearPicker';
import {primaryColor, textColor} from '../utils/GlobalStyle';

const DateTypeSelection = ({sendDateToHome}) => {
  let date = new Date();
  const options = ['Day', 'Month', 'Year'];

  const [showPicker, setShowPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Month');
  const [selectedValue, setSelectedValue] = useState(
    moment(date).format('MMMM, YYYY'),
  );

  const handleSelectOption = index => {
    const text = options[index];
    setSelectedOption(text);
    if (text === 'Day') setSelectedValue(date.toDateString());
    else setSelectedValue(moment(date).format('MMMM, YYYY'));
    if (text === 'Year') sendDateToHome('Year', date.getFullYear());
    else sendDateToHome(text, date);
  };

  const handleDateValue = selectedDate => {
    setShowPicker(false);
    if (selectedOption === 'Day') setSelectedValue(selectedDate.toDateString());
    else if (selectedOption === 'Month')
      setSelectedValue(moment(selectedDate).format('MMMM, YYYY'));
    else setSelectedValue(selectedDate);
    sendDateToHome(selectedOption, selectedDate);
  };

  const pickerTypeDisplay = () => {
    if (selectedOption === 'Day')
      return (
        <DatePicker
          handleSelectDate={handleDateValue}
          showFutureDates={false}
        />
      );
    return <MonthYearPicker handleSelectDate={handleDateValue} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {options.map((option, index) => (
          <Text
            key={index}
            style={[
              styles.optionText,
              selectedOption === option && styles.active,
            ]}
            onPress={() => handleSelectOption(index)}>
            {option}
          </Text>
        ))}
      </View>
      <View style={styles.selected}>
        {selectedOption === 'Year' ? (
          <YearPicker handleSelectDate={handleDateValue} />
        ) : (
          <Text style={styles.selectedText} onPress={() => setShowPicker(true)}>
            {selectedValue}
          </Text>
        )}
      </View>
      <View>{showPicker && pickerTypeDisplay()}</View>
    </View>
  );
};

export default DateTypeSelection;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'space-evenly',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 5,
  },
  optionText: {
    color: textColor,
    fontSize: 16,
  },
  active: {
    color: primaryColor,
    fontWeight: 'bold',
    borderBottomColor: primaryColor,
    borderBottomWidth: 2,
  },
  selected: {
    alignContent: 'center',
    marginTop: 15,
  },
  selectedText: {
    color: textColor,
    alignSelf: 'center',
    borderBottomWidth: 1,
  },
});
