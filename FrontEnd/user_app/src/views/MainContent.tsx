import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Iconicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ListTableStore from './ListTableStoreScreen';
import MangerOrder from './MangerOrderScreen';
import BlogScreen from './BlogScreen';
import ProfileUser from './ProfileUser';
import { COLORS } from '../constants/common';
// screens

// screen names
const homeUser = 'Trang chủ';
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
                })}
                tabBarOptions={{
                    activeTintColor: COLORS.darkGreen,
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                }}
            >
                <Tab.Screen
                    name={homeUser}
                    component={HomeScreen}
                    options={{
                        title: 'Cửa hàng',
                    }}
                />
                <Tab.Screen
                    name={listTableStore}
                    component={ListTableStore}
                    options={{
                        title: 'Danh sách bàn',
                    }}
                />
                <Tab.Screen
                    name={mangerOrder}
                    component={MangerOrder}
                    options={{
                        title: 'Đơn hàng',
                    }}
                />
                <Tab.Screen
                    name={blogView}
                    component={BlogScreen}
                    options={({ navigation, route }) => ({
                        title: 'Bài viết',
                    })}
                />
                <Tab.Screen
                    name={profileUser}
                    component={ProfileUser}
                    options={{
                        title: 'Cá nhân',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainContent;