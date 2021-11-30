import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DrawerIcon from '../components/DrawerIcon';
import AllTransactionsScreen from '../screens/AllTransactionsScreen';

const Stack = createNativeStackNavigator();

const TransactionStack = ({
  categories,
  allTransactions,
  deleteTransaction,
  updateTransaction,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllTransactionsScreen"
        options={({navigation}) => {
          return {
            title: 'Transaction History',
            headerLeft: () => <DrawerIcon navigation={navigation} />,
          };
        }}>
        {props => (
          <AllTransactionsScreen
            allTransactions={allTransactions}
            deleteTransaction={deleteTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddTransactionScreen"
        options={({navigation}) => {
          return {
            title: 'Update Transaction',
            headerLeft: () => <DrawerIcon navigation={navigation} />,
          };
        }}>
        {props => (
          <AddTransactionScreen
            categories={categories}
            updateTransaction={updateTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default TransactionStack;
