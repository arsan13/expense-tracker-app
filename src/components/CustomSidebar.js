import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomSidebar = ({handleToken, ...props}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      {/* <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        />
        <DrawerItem label="Logout" onPress={() => handleToken('')} />
        <View style={styles.customItem}>
          <Text
            style={styles.text}
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView> */}
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('HomeStack');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="clipboard-list" color={color} size={size} />
            )}
            label="Categories"
            onPress={() => {
              props.navigation.navigate('Categories');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="collapse-all-outline" color={color} size={size} />
            )}
            label="Transactions"
            onPress={() => {
              props.navigation.navigate('AllTransactions');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="bell-ring-outline" color={color} size={size} />
            )}
            label="Reminders"
            onPress={() => {
              props.navigation.navigate('ReminderStack');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="chart-areaspline" color={color} size={size} />
            )}
            label="Charts"
            onPress={() => {
              props.navigation.navigate('Charts');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            props.navigation.closeDrawer();
            handleToken(null);
          }}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: primaryColor,
  },
  logo: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  drawerContent: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomSidebar;
