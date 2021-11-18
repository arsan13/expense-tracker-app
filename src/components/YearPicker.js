import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {textColor} from '../utils/GlobalStyle';

const YearPicker = ({handleSelectDate}) => {
  let presentYear = new Date().getFullYear();
  const [year, setYear] = useState(presentYear);

  const handlePrev = () => {
    setYear(year - 1);
    handleSelectDate(year - 1);
  };

  const handleNext = () => {
    setYear(year + 1);
    handleSelectDate(year + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={handlePrev}>
        {'<'}
      </Text>
      <Text style={styles.text}>{year}</Text>
      {presentYear === year ? (
        <Text style={[styles.text, {color: '#fff'}]}>{'>'}</Text>
      ) : (
        <Text style={styles.text} onPress={handleNext}>
          {'>'}
        </Text>
      )}
    </View>
  );
};

export default YearPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 5,
    alignItems: 'center',
  },
  text: {
    color: textColor,
    paddingHorizontal: 10,
  },
});
