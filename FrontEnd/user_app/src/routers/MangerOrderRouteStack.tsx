import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const MangerOrderStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import MangerOrder from '../views/MangerOrderScreen';
import OrderDetailScreen from "../views/OrderDetailScreen";

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
                    title: 'Lịch sử đơn hàng',
                }}
            />
            <MangerOrderStack.Screen
                name='OrderDetailScreen'
                component={OrderDetailScreen}
                options={{
                    title: 'Chi tiết đơn hàng',
                }}
            />
        </ MangerOrderStack.Navigator>
    );
}
export default MangerOrderScreenStack;
