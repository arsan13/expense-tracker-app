import React, {useState, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CategoryScreen from '../screens/CategoryScreen';
import CustomSidebar from '../components/CustomSidebar';
import {deleteService, getService, postService, putService} from '../utils/Api';
import TransactionsScreen from '../screens/History';
import ReminderScreen from '../screens/ReminderScreen';
import ChartScreen from '../screens/ChartScreen';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const AppStack = ({token, handleToken}) => {
  const [categories, setCategories] = useState([]);

  //Read Categories
  const fetchAllCategories = async () => {
    try {
      let data = await getService('CATEGORIES_API', token);
      // data = calculateTotalExpense(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Add Category
  const addCategory = async category => {
    const data = await postService('CATEGORIES_API', token, category);
    if (data !== null) {
      setCategories([...categories, data]);
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
      // fetchAllCategories();
      let updatedCategories = [];
      categories.map(item =>
        item.id === category.id
          ? updatedCategories.push(res)
          : updatedCategories.push(item),
      );
      setCategories(updatedCategories);
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
      // for (let item in categories) {
      //   if (item.id === categoryId) {
      //     item.transactions.push(data);
      //     console.log(item.transactions);
      //   }
      // }
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
            addTransaction={addTransaction}
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
      <Drawer.Screen name="Transactions">
        {props => <TransactionsScreen categories={categories} />}
      </Drawer.Screen>
      <Drawer.Screen name="Reminders">
        {props => <ReminderScreen categories={categories} />}
      </Drawer.Screen>
      <Drawer.Screen name="Charts">
        {props => <ChartScreen categories={categories} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default AppStack;
