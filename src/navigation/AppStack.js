import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CustomSidebar from '../components/CustomSidebar';
import {getService} from '../utils/Api';
import TransactionsScreen from '../screens/History';
import ReminderScreen from '../screens/ReminderScreen';
import ChartScreen from '../screens/ChartScreen';
import HomeStack from './HomeStack';

const Drawer = createDrawerNavigator();

const AppStack = ({token, handleToken}) => {
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      let data = await getService('getAllCategories', token);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
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
        {props => <CategoryScreen categories={categories} />}
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
