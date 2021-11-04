import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CustomSidebar from '../components/CustomSidebar';
import {getService, postService} from '../utils/Api';
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
        {props => <HomeStack categories={categories} />}
      </Drawer.Screen>
      <Drawer.Screen name="Categories">
        {props => (
          <CategoryScreen categories={categories} addCategory={addCategory} />
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
