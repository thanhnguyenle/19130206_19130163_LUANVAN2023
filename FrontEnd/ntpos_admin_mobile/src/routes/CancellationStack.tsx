import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CancellationScreen, SearchCancellationScreen, } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const CashBookStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'

const CancellationScreenStack = ({ navigation }: any) => {
    return (
        <CashBookStack.Navigator
            initialRouteName='Cancellation'
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
            <CashBookStack.Screen
                name='Cancellation'
                component={CancellationScreen}
                options={{
                    title: 'Xuất hủy',
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
                                navigation.push('SearchCashBook');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                                // navigation.push('NotificationStack');
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
            <CashBookStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <CashBookStack.Screen
                name="SearchCashBook"
                component={SearchCancellationScreen}
                options={{
                    title: 'Tìm kiếm phiếu xuất hủy',
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


        </ CashBookStack.Navigator>
    );
}
export default CancellationScreenStack;