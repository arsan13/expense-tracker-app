import React, {useState} from 'react';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';

const MonthYearPicker = ({handleSelectDate}) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    console.log(moment(currentDate).format('DD/MM/YYYY'));
    setDate(currentDate);
    handleSelectDate(currentDate);
  };

  return <MonthPicker value={date} onChange={onChange} />;
};

export default MonthYearPicker;
