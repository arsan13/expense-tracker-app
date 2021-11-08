import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from './DatePicker';
import MonthYearPicker from './MonthYearPicker';
import YearPicker from './YearPicker';

const DateTypeSelection = () => {
  let date = new Date();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Month');
  const [selectedValue, setSelectedValue] = useState(date.toDateString());

  const handleSelectOption = text => {
    setSelectedOption(text);
    if (text === 'Day') setSelectedValue(date.toLocaleDateString());
    else setSelectedValue(date.toUTCString());
  };

  const handleDateValue = text => {
    setShowPicker(false);
    console.log({text});
    if (selectedOption === 'Day') setSelectedValue(text.toLocaleDateString());
    else if (selectedOption === 'Month') setSelectedValue(text.toUTCString());
    else setSelectedValue(text);
  };

  const pickerSelection = () => {
    if (selectedOption === 'Day')
      return <DatePicker handleSelectDate={handleDateValue} />;
    return <MonthYearPicker handleSelectDate={handleDateValue} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Text onPress={() => handleSelectOption('Day')}>Day</Text>
        <Text onPress={() => handleSelectOption('Month')}>Month</Text>
        <Text onPress={() => handleSelectOption('Year')}>Year</Text>
      </View>
      <View style={styles.selected}>
        {selectedOption === 'Year' ? (
          <YearPicker handleSelectDate={handleDateValue} />
        ) : (
          <Text style={styles.text} onPress={() => setShowPicker(true)}>
            {selectedValue}
          </Text>
        )}
      </View>
      <View>{showPicker && pickerSelection()}</View>
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
  selected: {
    alignContent: 'center',
  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 5,
  },
});
