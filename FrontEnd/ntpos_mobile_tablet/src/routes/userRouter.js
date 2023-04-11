import React from 'react';
import MainContent from '../views/MainContent';
import SearchScreen from '../views/SearchScreen';
import EditProfile from '../views/EditProfile';
import Reservation from '../views/Reservation';
import OrderDetail from '../views/OrderDetail';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetail from '../views/ProductDetail';
import {COLORS} from '../constants/common';
const Stack = createStackNavigator();
const DrawerUserNavigationRoutes = props => {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
      <Stack.Screen
        name="UserScreen"
        component={MainContent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          }, //Set Header text style
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Cập nhật',
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          }, //Set Header text style
          headerTintColor: '#fff', //Set Header text style
        }}
      />
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={{
          title: 'Đặt bàn',
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          }, //Set Header text style
          headerTintColor: '#fff', //Set Header text style
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          title: 'Chi tiết đơn hàng',
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          }, //Set Header text style
          headerTintColor: '#fff', //Set Header text style
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: 'Chi tiết món ăn',
          headerStyle: {
            backgroundColor: COLORS.darkGreen, //Set Header color
          }, //Set Header text style
          headerTintColor: '#fff', //Set Header text style
        }}
      />
    </Stack.Navigator>
  );
};
export default DrawerUserNavigationRoutes;
