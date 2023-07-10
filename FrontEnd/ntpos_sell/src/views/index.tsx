import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import SplashScreen from "./SplashScreen";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import AdminRoute from "../routes";
const Stack = createStackNavigator();
const RootComponent = () => {
    const currentScreen = useSelector((state: RootState) => state.navigation.currentScreen);
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="SellApp" screenOptions={{ headerShown: false }}>
                {currentScreen === 'Splash' && (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                )}
                {currentScreen === 'Login' && (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
                {currentScreen === 'Register' && (
                    <Stack.Screen name="Register" component={RegisterScreen} />
                )}
                {currentScreen === 'SellApp' && (
                    <Stack.Screen name="SellApp" component={AdminRoute} />
                )}
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootComponent;