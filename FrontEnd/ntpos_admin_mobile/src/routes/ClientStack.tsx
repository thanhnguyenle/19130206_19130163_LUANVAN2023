import { useState } from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import { AddClientScreen, AddGroupScreen, ClientScreen, DetailClientScreen, SearchClientScreen, SelectGroupScreen, SelectRoleScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ClientStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ButtonComponent, ButtonSheetCom, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setSearch } from '../redux_store/client/filterSlice';
import { sortUsers } from '../redux_store/client/clientSlice';

const ClientScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('ascending');
    const dispatch = useDispatch();
    const searchType = useSelector((state: RootState) => state.client.searchFifter.searchType);
    const searchValue = useSelector((state: RootState) => state.client.searchFifter.searchValue);
    const handleDateChange = (value: any) => {
        setLocDS(value)
        processSelectedDate(value);
    };
    const processSelectedDate = (value: any) => {
        // Xử lý giá trị ngày được chọn
        switch (value) {
            case 'ascending':
                dispatch(sortUsers('ascending'))
                break;
            case 'oldest':
                dispatch(sortUsers('oldest'))
                break;
            default:
                break;
        }
    };
    return (
        <ClientStack.Navigator
            initialRouteName='Client'
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
            <ClientStack.Screen
                name='Client'
                component={ClientScreen}
                options={{
                    title: 'Khách hàng',
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
                                navigation.push('SearchClient');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                            <BottomSheet title='' fontSize={12}
                                icon={<Ionicons name='md-filter-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 8, }} />}
                                height={220}
                                content={
                                    <RadioButton.Group onValueChange={handleDateChange} value={locDs}>
                                        <RadioButtonCom title='Mới nhất' value='ascending' />
                                        <RadioButtonCom title='Cũ nhất' value='oldest' />
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
            <ClientStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <ClientStack.Screen
                name="SearchClient"
                component={SearchClientScreen}
                options={{
                    title: 'Tìm khách hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            if (searchType != '' && searchValue != '') {
                                dispatch(setSearch({ searchType, searchValue }));
                                navigation.pop();
                            }
                            else {
                                navigation.pop();
                            }
                        }}>
                            <Text style={{ color: COLORS.darkGreen, fontSize: 18, fontWeight: '500' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ClientStack.Screen
                name="DetailClient"
                component={DetailClientScreen}
                options={{
                    title: 'Chi tiết khách hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ClientStack.Screen
                name="AddClient"
                component={AddClientScreen}
                options={{
                    title: 'Thêm khách hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.replace('Client');
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ClientStack.Screen
                name="SelectGroup"
                component={SelectGroupScreen}
                options={{
                    title: 'Chọn nhóm người dùng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ClientStack.Screen
                name="AddGroup"
                component={AddGroupScreen}
                options={{
                    title: 'Thêm nhóm người dùng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ClientStack.Screen
                name="SelectRole"
                component={SelectRoleScreen}
                options={{
                    title: 'Chọn quyền',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />

        </ ClientStack.Navigator>
    );
}
export default ClientScreenStack;