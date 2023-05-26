import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ReportScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ReportStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'

const ReportScreenStack = ({ navigation }: any) => {
    return (
        <ReportStack.Navigator
            initialRouteName='Report'
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
            <ReportStack.Screen
                name='Report'
                component={ReportScreen}
                options={{
                    title: 'Báo cáo',
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
            <ReportStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />


        </ ReportStack.Navigator>
    );
}
export default ReportScreenStack;