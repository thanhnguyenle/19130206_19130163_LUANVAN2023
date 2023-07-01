/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import RootComponent from './src/views';
import { Provider } from 'react-redux';
import store from './src/app/store';
function App(): JSX.Element {

  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}

export default App;