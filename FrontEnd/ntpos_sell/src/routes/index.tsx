import React from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/common'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { navigateToLogin } from '../redux/navigation/navigationSlice';
import HomeScreenStack from './HomeRouteStack';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const dispatch = useDispatch();
    return (
        <View style={styles.sideMenuContainer}>
            <View style={styles.profileHeader}>
                <Text style={styles.profileHeaderText}>Nguyễn Lê Thành</Text>
                <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2.2) }}>Chức vụ: Quản lý</Text>
            </View>
            <DrawerContentScrollView>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.logout}>
                <DrawerItem
                    label="Đăng xuất"
                    style={styles.drawerItem}
                    labelStyle={styles.drawerLabel}
                    icon={() => (
                        <Ionicons name='log-in-outline' size={22} color={COLORS.color_red} />
                    )}
                    activeBackgroundColor={COLORS.darkGreen}
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
                                    onPress: async () => {
                                        await AsyncStorage.removeItem('accessToken');
                                        await AsyncStorage.removeItem('refreshToken');
                                        // dispatch(logOut());
                                        dispatch(navigateToLogin())
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </View>

        </View >
    );
}
const styles = StyleSheet.create({
    label: {
        color: 'blue',
        fontSize: responsiveFontSize(2),
    },
    sideMenuContainer: {
        flex: 1,
        backgroundColor: COLORS.color_white,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'column',
        backgroundColor: COLORS.color_white,
        paddingTop: responsiveHeight(1.5),
        paddingBottom: responsiveHeight(1.5),
        paddingLeft: responsiveWidth(4),
        paddingRight: responsiveWidth(2),
        elevation: 2,
    },
    profileHeaderText: {
        color: COLORS.color_black,
        fontWeight: '500',
        fontSize: responsiveFontSize(3),
        paddingBottom: responsiveFontSize(0.6),
    },
    drawerItem: {
        marginHorizontal: 10,
    },
    drawerLabel: {
        fontSize: responsiveFontSize(2.1),
        color: 'red',
    },
    logout: {
        borderTopWidth: 0.28,
        borderColor: COLORS.color_grey_seconds,
    }
});
const AdminRoute = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: COLORS.darkGreen,
                drawerInactiveTintColor: COLORS.color_black,
                drawerLabelStyle: {
                    fontSize: responsiveFontSize(2)
                }
            }}
            drawerContent={
                (props) => <CustomDrawerContent {...props} />
            }
        >
            <Drawer.Screen
                name="Admin"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/home_black.png') : require('../assets/iconNav/home_green.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Trang chủ',
                }}
                component={HomeScreenStack}
            />
        </Drawer.Navigator >
    );
}
export default AdminRoute;