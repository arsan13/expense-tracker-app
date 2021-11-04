import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerIcon = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{marginRight: 30}}>
          <Icon name="menu" color="black" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerIcon;
