import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Iconicons from 'react-native-vector-icons/Ionicons';
import BlogScreen from '../views/BlogScreen';
import ProfileUser from '../views/ProfileUser';
import { COLORS } from '../constants/common';
import HomeScreenStack from './HomeRouteStack';
import ListTableStoreScreenStack from './ListTableStoreRouteStack';
import MangerOrderScreenStack from './MangerOrderRouteStack';
import BlogScreenStack from './BlogRouteStack';
import ProfileUserScreenStack from './ProfileUserRouteStack';
// screens

// screen names
const homeUser = 'NTPOS';
const listTableStore = 'Danh sách bàn';
const mangerOrder = 'Đơn hàng';
const blogView = 'Tin tức/Sự kiện';
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
                        } else if (rn === blogView) {
                            iconName = focused ? 'md-newspaper' : 'md-newspaper-outline';
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
                    name={blogView}
                    component={BlogScreenStack}
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