import React, {useState} from 'react';
import MonthPicker from 'react-native-month-year-picker';

const MonthYearPicker = ({handleSelectDate}) => {
  const [show, setShow] = useState(true);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(false);
    setDate(currentDate);
    handleSelectDate(currentDate);
  };

  return (
    <>{show && <MonthPicker value={date} mode="short" onChange={onChange} />}</>
  );
};

export default MonthYearPicker;
