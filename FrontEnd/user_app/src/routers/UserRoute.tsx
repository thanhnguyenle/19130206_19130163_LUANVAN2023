import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/common';
import HomeScreen from '../views/HomeScreen';
import SearchScreen from '../views/SearchScreen';
import EditProfile from '../views/EditProfileScreen';
import Reservation from '../views/Reservation';
import OrderDetail from '../views/OrderDetailScreen';
import ProductDetail from '../views/ProductDetail';
import MainContent from '../views/MainContent';

const Stack = createStackNavigator();

const DrawerUserNavigationRoutes: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name="User"
                component={MainContent}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    title: 'NTPOS',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    title: 'Cập nhật',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="Reservation"
                component={Reservation}
                options={{
                    title: 'Đặt bàn',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    title: 'Chi tiết đơn hàng',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                    title: 'Chi tiết món ăn',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            />
            {/* <Stack.Screen
                name="ChatBox"
                component={ChatBox}
                options={{
                    title: 'Chat với người bán',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                    },
                    headerTintColor: '#fff',
                }}
            /> */}
        </Stack.Navigator>
    );
};

export default DrawerUserNavigationRoutes;
