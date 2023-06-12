import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import SearchScreen from '../views/SearchScreen';
import HomeScreen from '../views/HomeScreen';

const ChatScreenStack = ({ navigation }: any) => {
    return (
        <ChatStack.Navigator
            initialRouteName='HomeChat'
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
            <ChatStack.Screen
                name='HomeChat'
                component={HomeScreen}
                options={{
                    title: 'NTPOS',
                }}
            />
        </ ChatStack.Navigator>
    );
}
export default ChatScreenStack;