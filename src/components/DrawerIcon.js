import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerIcon = ({navigation}) => {
  console.log({navigation});

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{marginRight: 30}}>
          <Icon name="menu" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerIcon;
