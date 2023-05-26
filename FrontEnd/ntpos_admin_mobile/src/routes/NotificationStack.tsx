import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    NotificationScreen,
    SettingNotification,
} from '../views/ImportFile';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotificationStack = createNativeStackNavigator();

const NotificationScreenStack = ({ navigation }: any) => {
    return (
        <NotificationStack.Navigator
            initialRouteName="Notification"
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.color_white,
                },
                headerTintColor: COLORS.darkGreen,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerShown: true,
            }}>
            <NotificationStack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    title: 'Thông báo',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='arrow-back-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.push('SettingNotification');
                        }}>
                            <Ionicons name='settings-sharp' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <NotificationStack.Screen
                name="SettingNotification"
                component={SettingNotification}
                options={{
                    title: 'Cài đặt thông báo',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Notification')

                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </NotificationStack.Navigator >
    );
};
export default NotificationScreenStack;