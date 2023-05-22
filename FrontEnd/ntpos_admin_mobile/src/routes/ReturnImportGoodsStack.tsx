import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DetailReturnImport, ImportProductScreen, ReturnImportGoodScreen, SearchImportProductScreen, SearchReturnImportGoods } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ReturnImportStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, ButtonSheetCom } from '../components';
import Entypo from 'react-native-vector-icons/Entypo'
const ReturnImportGoodsStack = ({ navigation }: any) => {
    return (
        <ReturnImportStack.Navigator
            initialRouteName='ReturnImport'
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
            <ReturnImportStack.Screen
                name='ReturnImport'
                component={ReturnImportGoodScreen}
                options={{
                    title: 'Trả hàng nhập',
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
                                navigation.push('SearchReturnImport');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {

                            }}>
                                <Ionicons name='md-filter-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.push('NotificationStack');
                            }}>
                                <Ionicons name='md-notifications-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                        </View>

                    ),
                }}
            />
            <ReturnImportStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <ReturnImportStack.Screen
                name="SearchReturnImport"
                component={SearchReturnImportGoods}
                options={{
                    title: 'Tìm kiếm phiếu trả',
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
            <ReturnImportStack.Screen
                name="DetailImportProduct"
                component={DetailReturnImport}
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

        </ ReturnImportStack.Navigator>
    );
}
export default ReturnImportGoodsStack;