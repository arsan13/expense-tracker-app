import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import DatePicker from './DatePicker';
import MonthYearPicker from './MonthYearPicker';
import YearPicker from './YearPicker';
import {primaryColor} from '../utils/GlobalStyle';

const DateTypeSelection = () => {
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
  };

  const handleDateValue = selectedDate => {
    setShowPicker(false);
    if (selectedOption === 'Day')
      setSelectedValue(selectedDate.toselectedDateString());
    else if (selectedOption === 'Month')
      setSelectedValue(moment(selectedDate).format('MMMM, YYYY'));
    else setSelectedValue(selectedDate);
  };

  const pickerTypeDisplay = () => {
    if (selectedOption === 'Day')
      return <DatePicker handleSelectDate={handleDateValue} />;
    return <MonthYearPicker handleSelectDate={handleDateValue} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        {options.map((option, index) => (
          <Text
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
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  optionText: {
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
  },
  selectedText: {
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
  },
});
