import { useState } from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DetailImportProduct, ImportProductScreen, SearchImportProductScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ImportProductStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ButtonSheetCom, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'

const ImportProductScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('moinhat');
    return (
        <ImportProductStack.Navigator
            initialRouteName='ImportProduct'
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
            <ImportProductStack.Screen
                name='ImportProduct'
                component={ImportProductScreen}
                options={{
                    title: 'Nhập hàng',
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
                                navigation.push('SearchImportProduct');
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
            <ImportProductStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <ImportProductStack.Screen
                name="SearchImportProduct"
                component={SearchImportProductScreen}
                options={{
                    title: 'Tìm kiếm phiếu nhập',
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
            <ImportProductStack.Screen
                name="DetailImportProduct"
                component={DetailImportProduct}
                options={{
                    title: 'Chi tiết phiếu nhập',
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


        </ ImportProductStack.Navigator>
    );
}
export default ImportProductScreenStack;