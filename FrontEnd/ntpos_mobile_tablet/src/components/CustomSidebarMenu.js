// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants/common';

const CustomSidebarMenu = props => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: COLORS.color_white}}>
            {props.user != null ? props.user.name.charAt(0) : 'K'}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={stylesSidebar.profileHeaderText}>
            {props.user != null ? props.user.name : 'Tài khoản khách'}
          </Text>
          <Text style={{color: COLORS.darkGreen, paddingHorizontal: 10}}>
            Chức vụ: {props.user != null ? props.user.position : 'Chưa có'}
          </Text>
        </View>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => (
            <Text style={stylesSidebar.drawrItem}>Đăng xuất</Text>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    backgroundColor: COLORS.color_white,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.color_white,
    paddingTop: 30,
    paddingBottom: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 1,
    paddingRight: 15,
  },
  profileHeaderPicCircle: {
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: COLORS.darkGreen,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: COLORS.darkGreen,
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  drawrItem: {
    color: '#737373',
  },
});
