import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Iconicons from 'react-native-vector-icons/Ionicons'

// screens
import HomeUser from './HomeUser'
import ListTableStore from './ListTableStore'
import MangerOrder from './MangerOrder'
import MailBox from './MailBox'
import ProfileUser from './ProfileUser'
import { COLORS } from '../constants/common'

// screen names
const homeUser = 'Trang chủ';
const listTableStore = 'Danh sách bàn';
const mangerOrder = 'Đơn hàng'
const mailBox = 'Hộp thư'
const profileUser = 'Cá nhân'

const Tab = createBottomTabNavigator();
const MainContent = () => {
    return (
        <Tab.Navigator initialRouteName={homeUser} screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === homeUser) {
                    iconName = focused ? 'home' : 'home-outline'
                } else if (rn == listTableStore) {
                    iconName = focused ? 'ios-apps-sharp' : 'ios-apps-outline'
                }
                else if (rn == mangerOrder) {
                    iconName = focused ? 'receipt-sharp' : 'receipt-outline'
                }
                else if (rn == mailBox) {
                    iconName = focused ? 'mail' : 'mail-outline'
                }
                else if (rn == profileUser) {
                    iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline'
                }
                return <Iconicons name={iconName} size={size} color={color} />
            }
        })}
            tabBarOptions={{
                activeTintColor: COLORS.darkGreen,
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 }
            }}
        >
            <Tab.Screen name={homeUser} component={HomeUser}
                options={{
                    title: 'Cửa hàng',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }} />
            <Tab.Screen name={listTableStore} component={ListTableStore}
                options={{
                    title: 'Danh sách bàn',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Tab.Screen name={mangerOrder} component={MangerOrder}
                options={{
                    title: 'Đơn hàng',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Tab.Screen name={mailBox} component={MailBox}
                options={{
                    title: 'Hộp thư',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
            <Tab.Screen name={profileUser} component={ProfileUser}
                options={{
                    title: 'Cá nhân',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen, //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Tab.Navigator>
    );
}
export default MainContent;