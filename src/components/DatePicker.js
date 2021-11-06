import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({handleSelectDate}) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    handleSelectDate(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={new Date()}
      mode="date"
      display="calendar"
      maximumDate={new Date()}
      onChange={onChange}
    />
  );
};

export default DatePicker;
