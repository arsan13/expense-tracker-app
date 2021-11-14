import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({handleSelectDate, showFutureDates}) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    handleSelectDate(currentDate);
  };

  let minDate = new Date(1900, 1, 1);
  let maxDate = new Date(2050, 1, 1);
  if (showFutureDates) {
    // Reminder calendar
    minDate = new Date();
    // minDate.setDate(minDate.getDate() + 1);
  } else {
    // Regular calendar
    maxDate = new Date();
  }

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={new Date()}
      mode="date"
      display="calendar"
      minimumDate={minDate}
      maximumDate={maxDate}
      onChange={onChange}
    />
  );
};

export default DatePicker;
