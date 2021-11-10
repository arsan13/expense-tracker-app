import React, {useState, useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import Loading from '../components/Loading';

const AllTransactionsScreen = ({route, deleteTransaction}) => {
  const category = route.params.category;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTransactions(category.transactions);
  }, []);

  const sortTransactions = property => {
    const sortedData = [...transactions].sort(
      (a, b) => b[property] - a[property],
    );
    setTransactions(sortedData);
  };

  const handleDelete = async transactionId => {
    setIsLoading(true);
    const isDeleted = await deleteTransaction(category.id, transactionId);
    if (isDeleted) {
      setTransactions(
        transactions.filter(transaction => transaction.id !== transactionId),
      );
    } else {
      //Add alert
      console.log('Error deleting transaction');
    }
    setIsLoading(false);
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.dataContainer}>
              <View>
                <Text style={{fontSize: 15}}>{category.title}</Text>
                <Text>
                  Date: {new Date(item.transactionDate).toDateString()}
                </Text>
                <Text>Amount: {item.amount}</Text>
                {item.note.trim() !== '' && <Text>Note: {item.note}</Text>}
              </View>
              <View style={{justifyContent: 'center'}}>
                <Button
                  title="Delete"
                  onPress={() => {
                    handleDelete(item.id);
                  }}
                />
              </View>
              {/* <View style={{borderBottomWidth: 1, marginTop: 10}} /> */}
            </View>
          )}
        />
      )}
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
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 25,
  },
});
