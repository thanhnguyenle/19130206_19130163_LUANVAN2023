/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootComponent from './src/views';
import { Provider } from 'react-redux';
import store from './src/app/store';
import Toast from 'react-native-toast-message';
function App(): JSX.Element {

  return (

    <Provider store={store}>
      <RootComponent />
      <Toast />
    </Provider>
  );
}

export default App;
