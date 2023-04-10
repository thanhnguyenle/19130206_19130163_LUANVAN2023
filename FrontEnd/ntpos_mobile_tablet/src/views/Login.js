import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/common';
import Btn from '../components/Btn';
import Background from './Background';
import { color_primary, color_white, darkGreen } from '../constants/common';
import Field from '../components/Field';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [error, setError] = useState(null);

  const [rightIcon, setRightIcon] = useState('eye');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setIsPasswordSecure(!isPasswordSecure);
      setRightIcon('eye-slash');
    } else if (rightIcon === 'eye-slash') {
      setIsPasswordSecure(!isPasswordSecure);
      setRightIcon('eye');
    }
  };

  const handleSubmitPress = (userEmail1, userPassword1) => {
    setErrortext('');
    if (userEmail1 === '') {
      alert('Email cannot be empty!');
      return;
    }
    if (userPassword1 === '') {
      alert('Password cannot be empty!');
      return;
    }
    setLoading(true);
    let dataToSend = { email: userEmail1, password: userPassword1 };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    // // fetch('http://localhost:3000/api/user/login', {
    // //   method: 'POST',
    // //   body: formBody,
    // //   headers: {
    // //     //Header Defination
    // //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // //   },
    // // })
    // //   .then(response => response.json())
    // //   .then(responseJson => {
    // //     //Hide Loader
    // //     setLoading(false);
    // //     console.log(responseJson);
    // //     // If server response message same as Data Matched
    // //     if (responseJson.status === 'success') {
    // //       AsyncStorage.setItem('user_id', responseJson.data.email);
    // //       console.log(responseJson.data.email);
    // //       navigation.replace('DrawerNavigationRoutes');
    // //     } else {
    // //       setErrortext(responseJson.msg);
    // //       console.log('Please check your email id or password');
    // //     }
    // //   })
    // //   .catch(error => {
    // //     //Hide Loader
    // //     setLoading(false);
    // //     console.error(error);
    // //   });
    AsyncStorage.setItem('user_id', 'thanh@gmail.com');
    navigation.replace('DrawerNavigationRoutes');
  };
  onLayout = e => {
    let isPortrait = e.nativeEvent.layout.heightScreen > e.nativeEvent.layout.widthScreen
    if (isPortrait == isPortrait) {
      this.setState({ isPortrait });
    }
  }

  return (
    <Background>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>
              Đăng nhập
            </Text>
            <View style={styles.bodyMain}>
              <Text style={{ fontSize: 40, color: COLORS.darkGreen, fontWeight: 'bold', marginBottom: 10 }}>
                Welcome Back
              </Text>
              <Text style={{ fontSize: 19, color: COLORS.color_grey, fontWeight: 'bold', marginBottom: 20 }}>
                Login to your account
              </Text>
              <Field
                widthInput={'90%'}
                placeholder={"Email"}
                keyboardType={"email-address"}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                autoCorrect={false}
              />
              <Field
                widthInput={'90%'}
                autoCorrect={false}
                onShowPassword={handlePasswordVisibility}
                eye={rightIcon}
                placeholder={"Password"}
                secureTextEntry={isPasswordSecure}
                onChangeText={UserPassword => setUserPassword(UserPassword)
                }
              />

              <View style={{ alignItems: 'flex-end', width: '78%', padding: 16, marginBottom: 40 }}>
                <TouchableOpacity>
                  <Text style={{ color: COLORS.darkGreen, fontWeight: 'bold', fontSize: 16 }}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              <Btn bgColor={COLORS.darkGreen} width={250} fontSize={20} borderColor={COLORS.darkGreen} textColor={COLORS.color_white} title={'Login'} onPress={() => {
                handleSubmitPress(userEmail, userPassword)
              }} />
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('RegisterScreen') }}>
                  <Text style={{ color: COLORS.darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Background>
  );
};
export default LoginScreen;
const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
const styles = StyleSheet.create({
  title: {
    color: COLORS.color_white,
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 10
  },
  bodyMain: {
    backgroundColor: 'white',
    height: heightScreen,
    width: widthScreen,
    borderTopLeftRadius: 130,
    paddingTop: 100,
    alignItems: 'center',
  }
});
