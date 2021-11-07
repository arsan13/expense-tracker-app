import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DrawerIcon from '../components/DrawerIcon';

const Stack = createNativeStackNavigator();

const HomeStack = ({handleToken, categories, navigation, addTransaction}) => {
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
      >
        {props => (
          <HomeScreen
            handleToken={handleToken}
            categories={categories}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddTransactionScreen">
        {props => (
          <AddTransactionScreen
            categories={categories}
            addTransaction={addTransaction}
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
