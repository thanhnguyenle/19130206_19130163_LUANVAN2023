import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { HomeScreen } from '../views/ImportIndex';
const HomeScreenStack = ({ navigation }: any) => {
    return (
        <HomeStack.Navigator
            initialRouteName='Home'
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
            <HomeStack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'NTPOS',
                }}
            />
            <HomeStack.Screen
                name='Demo'
                component={HomeScreen}
                options={{
                    title: 'NTPOS',
                }}
            />

        </ HomeStack.Navigator>
    );
}
export default HomeScreenStack;