import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import SearchScreen from '../views/SearchScreen';
import HomeScreen from '../views/HomeScreen';
import ChatBox from '../views/ChatBox';
import ProductMangerRouteStack from "./ProductMangerRouteStack";
import ProductDetail from "../views/ProductDetail";
import ListProductsScreen from "../views/ListProductScreen";
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
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="ChatScreen"
                component={ChatBox}
                options={{ headerShown: true }}
            />
            <HomeStack.Screen
            name="Notification"
            component={ChatBox}
            options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="DetailProductScreen"
                component={ProductDetail}
                options={{ headerShown: true }}
            />
            <HomeStack.Screen
                name="ListProductsScreen"
                component={ListProductsScreen}
                options={{ headerShown: true }}
            />

        </ HomeStack.Navigator>
    );
}
export default HomeScreenStack;
