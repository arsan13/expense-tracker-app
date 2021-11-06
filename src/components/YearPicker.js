import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const YearPicker = ({handleChange}) => {
  let presentYear = new Date().getFullYear();
  const [year, setYear] = useState(presentYear);

  const handlePrev = () => {
    setYear(year - 1);
    // handleChange(year);
  };

  const handleNext = () => {
    setYear(year + 1);
    // handleChange(year);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={handlePrev}>
        {'<'}
      </Text>
      <Text style={styles.text}>{year}</Text>
      {presentYear === year ? (
        <Text style={styles.text}>{'>'}</Text>
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
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
