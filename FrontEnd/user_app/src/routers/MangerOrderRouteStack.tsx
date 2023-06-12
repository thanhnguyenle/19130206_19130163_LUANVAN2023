import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const MangerOrderStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import MangerOrder from '../views/MangerOrderScreen';

const MangerOrderScreenStack = ({ navigation }: any) => {
    return (
        <MangerOrderStack.Navigator
            initialRouteName='HomeMangerOrder'
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
            <MangerOrderStack.Screen
                name='HomeMangerOrder'
                component={MangerOrder}
                options={{
                    title: 'Đơn hàng',
                }}
            />
        </ MangerOrderStack.Navigator>
    );
}
export default MangerOrderScreenStack;