import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CategoryScreen from '../screens/CategoryScreen';
import CustomSidebar from '../components/CustomSidebar';
import {deleteService, getService, postService, putService} from '../utils/Api';
import {
  calculateTotalExpense,
  eliminateReminders,
  getAllTransactions,
  handleCategories,
} from '../utils/HandleExpenses';
import AllTransactionsScreen from '../screens/AllTransactionsScreen';
import ChartScreen from '../screens/ChartScreen';
import HomeStack from './HomeStack';
import ReminderStack from './ReminderStack';
import {Alert} from 'react-native';
import TransactionStack from './TransactionStack';

const Drawer = createDrawerNavigator();

const AppStack = ({token, handleToken}) => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);

  //Read Categories
  const fetchAllCategories = async () => {
    let allData = await getService('CATEGORIES_API', token);
    if (allData === null) {
      setCategories(null);
      Alert.alert(
        'Internal Server Error!',
        'You will be logged out. Please try to login later.',
        [
          {
            text: 'Ok',
            onPress: handleToken(''),
          },
        ],
        {cancelable: true},
      );
      return;
    }
    allData = handleCategories(allData); //Add color field and capitalize category title
    let tempTransactions = getAllTransactions(allData);
    let data = eliminateReminders(allData);
    data = calculateTotalExpense(data);
    setCategories(data);
    setTransactions(tempTransactions.filter(item => item.remind === false));
    setReminders(tempTransactions.filter(item => item.remind === true));
  };

  //Add Category
  const addCategory = async category => {
    const data = await postService('CATEGORIES_API', token, category);
    if (data !== null) {
      fetchAllCategories();
      return true;
    }
    return false;
  };

  //Update Category
  const updateCategory = async category => {
    const res = await putService(
      'CATEGORIES_API',
      token,
      category,
      category.id,
    );
    if (res !== null) {
      fetchAllCategories();
      return true;
    }
    return false;
  };

  //Delete Category
  const deleteCategory = async id => {
    const res = await deleteService('CATEGORIES_API', token, id);
    if (res !== null) {
      setCategories(categories.filter(category => category.id !== id));
      return true;
    }
    return false;
  };

  //Add transaction
  const addTransaction = async (transaction, categoryId) => {
    const data = await postService(
      'TRANSACTIONS_API',
      token,
      transaction,
      categoryId,
    );
    if (data !== null) {
      fetchAllCategories();
      return true;
    }
    return false;
  };

  //Delete Transaction
  const deleteTransaction = async (categoryId, transactionId) => {
    const res = await deleteService(
      'TRANSACTIONS_API',
      token,
      categoryId,
      transactionId,
    );
    if (res !== null) {
      fetchAllCategories();
      return true;
    }
    return false;
  };

  //Update Transaction
  const updateTransaction = async (transaction, categoryId, transactionId) => {
    const res = await putService(
      'TRANSACTIONS_API',
      token,
      transaction,
      categoryId,
      transactionId,
    );
    if (res !== null) {
      fetchAllCategories();
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={props => (
        <CustomSidebar handleToken={handleToken} {...props} />
      )}>
      <Drawer.Screen name="HomeStack" options={{headerShown: false}}>
        {props => (
          <HomeStack
            handleToken={handleToken}
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Categories">
        {props => (
          <CategoryScreen
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="AllTransactions" options={{headerShown: false}}>
        {props => (
          // <AllTransactionsScreen
          //   allTransactions={transactions}
          //   deleteTransaction={deleteTransaction}
          // />
          <TransactionStack
            categories={categories}
            allTransactions={transactions}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="ReminderStack" options={{headerShown: false}}>
        {props => (
          <ReminderStack
            categories={categories}
            reminders={reminders}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Charts">
        {props => (
          <ChartScreen categories={categories} transactions={transactions} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default AppStack;
