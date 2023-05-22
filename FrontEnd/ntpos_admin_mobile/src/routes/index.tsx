import React, { useState, useEffect } from 'react'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/common'
const Drawer = createDrawerNavigator();
import {
    ClauseScreen,
} from '../views/ImportFile';
import {
    HomeScreenStack, ProductScreenStack,
    CashBookScreenStack, InventoryScreenStack, BillScreenStack,
    ExportProductScreenStack, SupplierScreenStack, ClientScreenStack,
    CancellationScreenStack, ImportProductScreenStack, ReportScreenStack, RoomTableScreenStack, MailBoxScreenStack, ReturnImportGoodsStack, SellStack
} from './ImportFile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux_store/auth/authSlice';
import { navigateToLogin } from '../redux_store/navigation/navigationSlice';

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
                                        dispatch(logOut());
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
                name="AdminHome"
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

            <Drawer.Screen
                name="AdminProduct"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/product_black.png') : require('../assets/iconNav/product_green.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Hàng hóa',
                }}
                component={ProductScreenStack}
            />
            <Drawer.Screen
                name="AdminInventory"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/inventory_black.png') : require('../assets/iconNav/inventory.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Kiểm kho',
                }}
                component={InventoryScreenStack}
            />
            <Drawer.Screen
                name="AdminBill"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/bill.png') : require('../assets/iconNav/bill_green.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Hóa đơn',
                }}
                component={BillScreenStack}
            />
            <Drawer.Screen
                name="AdminExportProduct"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/delivery-service.png') : require('../assets/iconNav/delivery-service_green.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Trả hàng',
                }}
                component={ExportProductScreenStack}
            />
            <Drawer.Screen
                name="AdminImportProduct"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/delivery-truck.png') : require('../assets/iconNav/truck.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Nhập hàng',
                }}
                component={ImportProductScreenStack}
            />
            <Drawer.Screen
                name="AdminReturnImportGood"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/shopping-cart_1.png') : require('../assets/iconNav/shopping-cart.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Trả hàng nhập',
                }}
                component={ReturnImportGoodsStack}
            />
            <Drawer.Screen
                name="AdminCancellation"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/money-transfer_black.png') : require('../assets/iconNav/money-transfer.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Xuất hủy',
                }}
                component={CancellationScreenStack}
            />
            <Drawer.Screen
                name="AdminClient"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/user.png') : require('../assets/iconNav/account.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Khách hàng',
                }}
                component={ClientScreenStack}
            />
            <Drawer.Screen
                name="AdminSupplier"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/parcel_back.png') : require('../assets/iconNav/parcel.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Nhà cung cấp',
                }}
                component={SupplierScreenStack}
            />
            <Drawer.Screen
                name="AdminCashBook"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/book.png') : require('../assets/iconNav/book_blac.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Sổ quỹ',
                }}
                component={CashBookScreenStack}
            />
            <Drawer.Screen
                name="AdminReport"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/report.png') : require('../assets/iconNav/report_1.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Báo cáo',
                }}
                component={ReportScreenStack}
            />
            <Drawer.Screen
                name="AdminRoomTable"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/menu.png') : require('../assets/iconNav/visualization.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Phòng/Bàn',
                }}
                component={RoomTableScreenStack}
            />
            <Drawer.Screen
                name="AdminSell"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/logo.png') : require('../assets/iconNav/logo.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Bán hàng',
                }}
                component={SellStack}
            />
            <Drawer.Screen
                name="AdminMailbox"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/mailbox.png') : require('../assets/iconNav/mailbox_1.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Hộp thư',
                }}
                component={MailBoxScreenStack}
            />
            <Drawer.Screen
                name="AdminClause"
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Image
                            source={!focused ? require('../assets/iconNav/i_1.png') : require('../assets/iconNav/i.png')}
                            style={{ width: size - 3, height: size - 3 }} />
                    ),
                    drawerLabel: 'Điều khoản',
                    title: 'Clause Screen',
                    headerShown: true,
                    headerTitle: 'Điều khoản sử dụng',
                    headerTintColor: '#fff',
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: COLORS.darkGreen,
                        height: 60,
                        borderBottomWidth: 3,
                        borderBottomColor: '#fff',
                    },
                }}
                component={ClauseScreen}
            />
        </Drawer.Navigator >
    );
}
export default AdminRoute;