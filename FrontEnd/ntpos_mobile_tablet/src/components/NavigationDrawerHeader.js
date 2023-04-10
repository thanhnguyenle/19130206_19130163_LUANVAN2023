// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const NavigationDrawerHeader = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Feather name="menu" size={25} color={props.color} style={{ paddingLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
