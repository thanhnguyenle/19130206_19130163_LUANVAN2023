// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Import Screens
import OptionType from '../views/OptionType';
import SettingsScreen from '../views/SettingScreen';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import { COLORS } from '../constants/common';
const optionTypeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="OptionType"
        component={OptionType}
        options={{
          title: 'Chế độ', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} color='white' />
          ),
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} color='white' />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator >
  );
};

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.color_grey_seconds,
        headerShown: false,
        drawerLabelStyle: {
          color: COLORS.darkGreen,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
          fontWeight: 400,
        }
      }}
      drawerContent={CustomSidebarMenu}
    >
      <Drawer.Screen
        name="optionTypeScreenStack"
        options={{
          drawerLabel: 'Chế độ',
        }}
        component={optionTypeScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{ drawerLabel: 'Cài đặt' }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigatorRoutes;
