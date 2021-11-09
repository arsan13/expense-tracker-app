import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

const AllTransactionsScreen = ({route}) => {
  const categoryName = route.params.categoryName;
  const [transactions, setTransactions] = useState(route.params.transactions);

  const sortTransactions = property => {
    const sortedData = [...transactions].sort(
      (a, b) => b[property] - a[property],
    );
    setTransactions(sortedData);
  };

  return (
    <View>
      <View style={styles.header}>
        <Button
          title="Sort by date"
          onPress={() => sortTransactions('transactionDate')}
        />
        <Button
          title="Sort by amount"
          onPress={() => sortTransactions('amount')}
        />
      </View>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{marginVertical: 5, marginHorizontal: 25}}>
            <Text style={{fontSize: 15}}>{categoryName}</Text>
            <Text>Date: {new Date(item.transactionDate).toDateString()}</Text>
            <Text>Amount: {item.amount}</Text>
            {item.note.trim() !== '' && <Text>Note: {item.note}</Text>}
            <View style={{borderBottomWidth: 1, marginTop: 10}} />
          </View>
        )}
      />
    </View>
  );
};

export default AllTransactionsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
