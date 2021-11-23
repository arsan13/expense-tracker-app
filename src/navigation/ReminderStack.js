import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerIcon from '../components/DrawerIcon';
import ReminderScreen from '../screens/ReminderScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../utils/GlobalStyle';

const Stack = createNativeStackNavigator();

const ReminderStack = ({
  categories,
  reminders,
  addTransaction,
  deleteTransaction,
  updateTransaction,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReminderScreen"
        options={({navigation}) => {
          return {
            title: 'Reminders',
            headerLeft: () => <DrawerIcon navigation={navigation} />,
            headerRight: () => (
              <Icon
                name="pluscircleo"
                size={25}
                color={primaryColor}
                onPress={() => {
                  navigation.navigate('AddReminder', {showFutureDates: true});
                }}
              />
            ),
          };
        }}>
        {props => (
          <ReminderScreen
            reminders={reminders}
            deleteTransaction={deleteTransaction}
            updateTransaction={updateTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddReminder" options={{title: 'Add Reminder'}}>
        {props => (
          <AddTransactionScreen
            categories={categories}
            reminders={reminders}
            addTransaction={addTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ReminderStack;
