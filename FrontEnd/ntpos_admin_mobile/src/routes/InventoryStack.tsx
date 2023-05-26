import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import { DetailInventoryScreen, InventoryScreen, SearchInventoryScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const InventoryStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ButtonSheetCom, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper';
const InventoryScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('moinhat');
    const [thaoTac, setThaoTac] = useState('huyphieu');
    return (
        <InventoryStack.Navigator
            initialRouteName='Inventory'
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.color_white,
                },
                headerTintColor: COLORS.darkGreen,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerShown: true,
            }}
        >
            <InventoryStack.Screen
                name='Inventory'
                component={InventoryScreen}
                options={{
                    title: 'Kiểm kho',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <Ionicons name='menu' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                                navigation.push('SearchInventory');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 4, }} />
                            </TouchableOpacity>
                            <BottomSheet title='' fontSize={12}
                                icon={<Ionicons name='md-filter-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 8, }} />}
                                height={200}
                                content={
                                    <RadioButton.Group onValueChange={newLocDs => setLocDS(newLocDs)} value={locDs}>
                                        <RadioButtonCom title='Mới nhất' value='moinhat' />
                                        <RadioButtonCom title='Cũ nhất' value='cunhat' />
                                    </RadioButton.Group>
                                } />
                            <TouchableOpacity onPress={() => {
                                navigation.push('NotificationStack');
                            }}>
                                <Ionicons name='md-notifications-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                        </View>

                    ),
                }}
            />
            < InventoryStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            < InventoryStack.Screen
                name="SearchInventory"
                component={SearchInventoryScreen}
                options={{
                    title: 'Tìm kiếm phiếu kiểm',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Text style={{ color: COLORS.darkGreen, fontSize: 18, fontWeight: '500' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            < InventoryStack.Screen
                name="DetailInventoryScreen"
                component={DetailInventoryScreen}
                options={{
                    title: 'Chi tiết phiếu kiểm',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <BottomSheet title='' fontSize={12}
                            icon={<Entypo name='dots-three-horizontal' size={25} color={COLORS.darkGreen} style={{ marginRight: 8, }} />}
                            height={160}
                            content={
                                <View style={{ alignItems: 'center' }}>
                                    <ButtonSheetCom onPress={() => { }} title='In' titleStyle={{}} />
                                    <ButtonSheetCom onPress={() => { }} title='Hủy phiếu' titleStyle={{ color: COLORS.color_red }} />
                                </View>
                            } />
                    ),
                }}

            />


        </ InventoryStack.Navigator >
    );
}
export default InventoryScreenStack;