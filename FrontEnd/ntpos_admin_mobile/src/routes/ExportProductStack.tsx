import { useState } from 'react'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DetailExportProductScreen, ExportProductScreen, SearchExportProductScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ExportProductStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper';

const ExportProductScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('moinhat');
    return (
        <ExportProductStack.Navigator
            initialRouteName='ExportProduct'
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
            <ExportProductStack.Screen
                name='ExportProduct'
                component={ExportProductScreen}
                options={{
                    title: 'Trả hàng',
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
                                navigation.push('SearchExportProduct');
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
            <ExportProductStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <ExportProductStack.Screen
                name="SearchExportProduct"
                component={SearchExportProductScreen}
                options={{
                    title: 'Tìm kiếm trả hàng',
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
            <ExportProductStack.Screen
                name="DetailExportProduct"
                component={DetailExportProductScreen}
                options={{
                    title: 'Chi tiết phiếu trả hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />

        </ ExportProductStack.Navigator>
    );
}
export default ExportProductScreenStack;