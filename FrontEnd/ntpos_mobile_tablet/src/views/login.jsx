import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants/common';
import Loader from '../components/Loader';
import Btn from '../components/Btn';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const passwordInputRef = createRef();
  const [error, setError] = useState(null);

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    // fetch('http://localhost:3000/api/user/login', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       AsyncStorage.setItem('user_id', responseJson.data.email);
    //       console.log(responseJson.data.email);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
    AsyncStorage.setItem('user_id', 'thanh@gmail.com');
    navigation.replace('DrawerNavigationRoutes');
  };

  return (
   <View>
        <ImageBackground
          source={require('../assets/images/background.png')}
          style={{width: '100%', height: '100%'}}>
          <View style={{height: '100%', width: '100%',position:'absolute'}}>
          <Btn bg/>
          </View>
        </ImageBackground>
      </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({

});
