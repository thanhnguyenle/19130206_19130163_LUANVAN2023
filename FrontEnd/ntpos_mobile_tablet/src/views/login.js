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
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants/common';
import Loader from '../components/Loader';
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
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/logo.jpg')}
                style={{
                  width: '50%',
                  height: 70,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Hoshi
                label={'EMAIL'}
                // this is used as active border color
                borderColor={COLORS.color_seconds}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={COLORS.color_white}
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                // placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Hoshi
                secureTextEntry={isPasswordSecure}
                label={'PASSWORD'}
                // this is used as active border color
                borderColor={COLORS.color_seconds}
                // active border height
                borderHeight={3}
                inputPadding={16}
                // this is used to set backgroundColor of label mask.
                // please pass the backgroundColor of your TextInput container.
                backgroundColor={COLORS.color_white}
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                // placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
              <Icon
                style={styles.icon}
                name={isPasswordSecure ? 'eye-slash' : 'eye'}
                size={30}
                color="rgb(0, 200, 160)"
                onPress={
                  isPasswordSecure
                    ? () => setIsPasswordSecure(false)
                    : () => setIsPasswordSecure(true)
                }
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.color_white,
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 40,
    marginLeft: 35,
    marginRight: 35,
    // margin: 10,
  },
  buttonStyle: {
    backgroundColor: COLORS.color_primary,
    borderWidth: 0,
    color: COLORS.color_white,
    borderColor: COLORS.color_primary,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 80,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: COLORS.color_white,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    // color: 'white',
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderWidth: 1,
    // borderRadius: 30,
    // borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: COLORS.color_white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 20,
    marginRight: 12,
    width: '10%',
    alignSelf: 'flex-start',
  },
});
