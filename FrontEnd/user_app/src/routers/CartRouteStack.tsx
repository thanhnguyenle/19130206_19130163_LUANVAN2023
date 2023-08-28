import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
const CartStack = createNativeStackNavigator();
import CartScreen from '../views/CartScreen';
import SelectTableScreen from "../views/SelectTableScreen";
import OrderInformationScreen from "../views/OrderInformation";
import SelectMethodPaymentScreen from "../views/SelectMethodPayment";
import HomeScreenStack from "./HomeRouteStack";

const CartScreenStack = ({ navigation }: any) => {
    return (
        <CartStack.Navigator
            initialRouteName='HomeCart'
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
            <CartStack.Screen
                name='HomeCart'
                component={CartScreen}
                options={{
                    title: 'Giỏ hàng',
                }}
            />
            <CartStack.Screen
                name='SelectTableScreen'
                component={SelectTableScreen}
                options={{
                    title: 'Chọn bàn',
                }}
            />
            <CartStack.Screen
                name='OrderInformationScreen'
                component={OrderInformationScreen}
                options={{
                    title: 'Đặt bàn',
                }}
            />
            <CartStack.Screen
                name='SelectMethodPaymentScreen'
                component={SelectMethodPaymentScreen}
                options={{
                    title: 'Chọn phương thức thanh toán',
                }}
            />
        </ CartStack.Navigator>
    );
}
export default CartScreenStack;
