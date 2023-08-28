import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/common';
import HomeScreenStack from './HomeRouteStack';
import ListTableStoreScreenStack from './ListTableStoreRouteStack';
import MangerOrderScreenStack from './MangerOrderRouteStack';
import ProfileUserScreenStack from './ProfileUserRouteStack';
import CartScreenStack from "./CartRouteStack";
// screens

// screen names
const homeUser = 'NTPOS';
const listTableStore = 'Danh sách bàn';
const mangerOrder = 'Đơn hàng';
const cart = 'Giỏ hàng';
const profileUser = 'Cá nhân';

const Tab = createBottomTabNavigator();

const MainContent = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={homeUser}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === homeUser) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === listTableStore) {
                            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-outline';
                        } else if (rn === mangerOrder) {
                            iconName = focused ? 'receipt-sharp' : 'receipt-outline';
                        } else if (rn === cart) {
                            iconName = focused ? 'cart-sharp' : 'cart-outline';
                        } else if (rn === profileUser) {
                            iconName = focused
                                ? 'ios-person-circle'
                                : 'ios-person-circle-outline';
                        }
                        return <Iconicons name={iconName + ''} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: COLORS.darkGreen,
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                })}
            >
                <Tab.Screen
                    name={homeUser}
                    component={HomeScreenStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={listTableStore}
                    component={ListTableStoreScreenStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={mangerOrder}
                    component={MangerOrderScreenStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={cart}
                    component={CartScreenStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={profileUser}
                    component={ProfileUserScreenStack}
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainContent;
