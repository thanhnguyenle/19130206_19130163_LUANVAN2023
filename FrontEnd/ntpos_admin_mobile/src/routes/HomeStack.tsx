import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    HomeScreen,
    NotificationScreen,
    OverviewSreen,
    SettingNotification,
} from '../views/ImportFile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationScreenStack from './NotificationStack';
const HomeStack = createNativeStackNavigator()
const HomeScreenStack = ({ navigation }: any) => {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
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
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'NTPOS',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <Ionicons name='menu' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.push('NotificationStack');
                        }}>
                            <Ionicons name='md-notifications-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <HomeStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="Overview"
                component={OverviewSreen}
                options={{
                    title: 'Tổng quan',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='arrow-back-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </HomeStack.Navigator >
    );
};
export default HomeScreenStack;