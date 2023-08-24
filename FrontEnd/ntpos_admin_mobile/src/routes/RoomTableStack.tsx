import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RoomTableScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const RoomTableStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import AddTableScreen from '../views/roomTable/AddTableScreen';
import SelectGroupTableScreen from '../views/roomTable/SelectGroupTable';
import SelectTableScreen from '../views/roomTable/SelectTable';

const RoomTableScreenStack = ({ navigation }: any) => {
    return (
        <RoomTableStack.Navigator
            initialRouteName='RoomTable'
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
            <RoomTableStack.Screen
                name='RoomTable'
                component={RoomTableScreen}
                options={{
                    title: 'Khu vực phòng/bàn',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <Ionicons name='menu' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.push('NotificationStack');
                            }}>
                                <Ionicons name='md-notifications-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                        </View>

                    ),
                }}
            />
            <RoomTableStack.Screen
                name='AddRoomTable'
                component={AddTableScreen}
                options={{
                    title: 'Thêm bàn/ khu vực',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.replace('RoomTable');
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
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
            <RoomTableStack.Screen
                name='SelectGroupTable'
                component={SelectGroupTableScreen}
                options={{
                    title: 'Chọn khu vực',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <RoomTableStack.Screen
                name='SelectTables'
                component={SelectTableScreen}
                options={{
                    title: 'Chọn bàn',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <RoomTableStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />


        </ RoomTableStack.Navigator>
    );
}
export default RoomTableScreenStack;