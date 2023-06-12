import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import SplashScreen from "./auth/SplashScreen";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import MainContent from "../routers/MainContent";
const Stack = createStackNavigator();
const RootComponent = () => {
    const currentScreen = useSelector((state: RootState) => state.navigation.currentScreen);
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                {currentScreen === 'Splash' && (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                )}
                {currentScreen === 'Login' && (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
                {currentScreen === 'Register' && (
                    <Stack.Screen name="Register" component={RegisterScreen} />
                )}
                {currentScreen === 'DrawerUser' && (
                    <Stack.Screen name="DrawerUser" component={MainContent} />
                )}
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootComponent;