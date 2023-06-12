import React, { useEffect, useState } from "react";
import AdminRoute from "../routes";
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, RegisterScreen, SplashScreen } from "./ImportFile";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { createStackNavigator } from "@react-navigation/stack";
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
                {currentScreen === 'Admin' && (
                    <Stack.Screen name="Admin" component={AdminRoute} />
                )}
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootComponent;
