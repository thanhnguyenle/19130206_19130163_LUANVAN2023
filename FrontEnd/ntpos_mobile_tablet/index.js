/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import HomeUser from './src/views/HomeUser';

AppRegistry.registerComponent(appName, () => HomeUser);
