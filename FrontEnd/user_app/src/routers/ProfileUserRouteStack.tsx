import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const ProfileUserStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import SearchScreen from '../views/SearchScreen';
import HomeScreen from '../views/HomeScreen';
import ProfileUser from '../views/ProfileUser';

const ProfileUserScreenStack = ({ navigation }: any) => {
    return (
        <ProfileUserStack.Navigator
            initialRouteName='HomeProfileUser'
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
            <ProfileUserStack.Screen
                name='HomeProfileUser'
                component={ProfileUser}
                options={{
                    title: 'Cá nhân',
                }}
            />
        </ ProfileUserStack.Navigator>
    );
}
export default ProfileUserScreenStack;