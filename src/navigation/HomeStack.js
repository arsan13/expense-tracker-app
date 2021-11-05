import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DrawerIcon from '../components/DrawerIcon';

const Stack = createNativeStackNavigator();

const HomeStack = ({categories, navigation, addTransaction}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={({navigation}) => {
          return {
            title: 'Home',
            headerLeft: () => <DrawerIcon navigation={navigation} />,
          };
        }}
        // options={({navigation}) => ({
        //   headerLeft: () => (
        //     <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        //       <View style={{marginRight: 30}}>
        //         <Icon name="menu" size={30} />
        //       </View>
        //     </TouchableOpacity>
        //   ),
        //   headerLeftContainerStyle: {paddingLeft: 10},
        // })}
        component={({navigation}) => (
          <HomeScreen navigation={navigation} categories={categories} />
        )}
      />
      <Stack.Screen
        name="AddTransactionScreen"
        component={({navigation}) => (
          <AddTransactionScreen
            navigation={navigation}
            categories={categories}
            addTransaction={addTransaction}
          />
        )}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
