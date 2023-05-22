import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/views/Splash';
import LoginScreen from './src/views/Login';
import RegisterScreen from './src/views/Signup';
import DrawerUserNavigationRoutes from './src/routes/userRouter';
import rootReducer from './src/reducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const Stack = createStackNavigator();
const store = createStore(rootReducer);

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DrawerUserNavigationRoutes"
            component={DrawerUserNavigationRoutes}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
