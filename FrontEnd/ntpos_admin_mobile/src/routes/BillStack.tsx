import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BillScreen, DetailBillScreen, DetailTypeTableScreen, SearchBillScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const BillStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ButtonSheetCom, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'

const BillScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('moinhat');
    return (
        <BillStack.Navigator
            initialRouteName='Bill'
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
            <BillStack.Screen
                name='Bill'
                component={BillScreen}
                options={{
                    title: 'Hóa đơn',
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
                                navigation.push('SearchBill');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
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
            <BillStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <BillStack.Screen
                name="SearchBill"
                component={SearchBillScreen}
                options={{
                    title: 'Tìm kiếm hóa đơn',
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
            <BillStack.Screen
                name="DetailSelectTyleTable"
                component={DetailTypeTableScreen}
                options={{
                    title: 'Chọn bàn',
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
            <BillStack.Screen
                name="DetailBillScreen"
                component={DetailBillScreen}
                options={{
                    title: 'Chi tiết hóa đơn',
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
                                    <ButtonSheetCom onPress={() => { }} title='Hủy đơn hàng' titleStyle={{ color: COLORS.color_red }} />
                                </View>
                            } />
                    ),
                }}

            />
        </ BillStack.Navigator>
    );
}
export default BillScreenStack;