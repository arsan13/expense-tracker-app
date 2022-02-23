import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DrawerIcon from '../components/DrawerIcon';
import AllTransactionsScreen from '../screens/AllTransactionsScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createNativeStackNavigator();

const HomeStack = ({
  reload,
  handleToken,
  categories,
  addCategory,
  deleteCategory,
  updateCategory,
  addTransaction,
  deleteTransaction,
  updateTransaction,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={({navigation}) => {
          return {
            title: 'Home',
            headerLeft: () => <DrawerIcon navigation={navigation} />,
          };
        }}>
        {props => (
          <HomeScreen
            reload={reload}
            handleToken={handleToken}
            allCategories={categories}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddTransactionScreen"
        options={({route}) => ({title: route.params.name})}>
        {props => (
          <AddTransactionScreen
            categories={categories}
            addTransaction={addTransaction}
            updateTransaction={updateTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CategoryScreen" options={{title: 'Add Category'}}>
        {props => (
          <CategoryScreen
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AllTransactionsScreen"
        options={{title: 'Transactions'}}>
        {props => (
          <AllTransactionsScreen
            deleteTransaction={deleteTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
