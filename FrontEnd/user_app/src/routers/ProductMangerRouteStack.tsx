import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const ProductMangerStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import SearchScreen from '../views/SearchScreen';
import HomeScreen from '../views/HomeScreen';
import ProfileUser from '../views/ProfileUser';
import ProductDetail from "../views/ProductDetail";

const ProductMangerRouteStack = ({ navigation }: any) => {
    return (
        <ProductMangerStack.Navigator
            initialRouteName='DetailProductScreen'
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
            <ProductMangerStack.Screen
                name='DetailProductScreen'
                component={ProductDetail}
                options={{
                    title: 'Chi tiết sản phẩm',
                }}
            />
        </ ProductMangerStack.Navigator>
    );
}
export default ProductMangerRouteStack;
