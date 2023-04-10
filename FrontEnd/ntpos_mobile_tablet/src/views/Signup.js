import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Background from './Background';
import Loader from '../components/Loader';
import Field from '../components/Field'
import Btn from '../components/Btn'
import { COLORS } from '../constants/common';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isPasswordRetySecure, setIsPasswordRetySecure] = useState(true);
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIconRety, setRightIconRety] = useState('eye');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setIsPasswordSecure(!isPasswordSecure);
      setRightIcon('eye-slash');
    } else if (rightIcon === 'eye-slash') {
      setIsPasswordSecure(!isPasswordSecure);
      setRightIcon('eye');
    }
  };
  const handleRetyPasswordVisibility = () => {
    if (rightIconRety === 'eye') {
      setIsPasswordRetySecure(!isPasswordRetySecure);
      setRightIconRety('eye-slash');
    } else if (rightIconRety === 'eye-slash') {
      setIsPasswordRetySecure(!isPasswordRetySecure);
      setRightIconRety('eye');
    }
  };
  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      address: userAddress,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    console.log('register success!');
  };

  return (
    <Background>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ alignItems: 'center', width: widthScreen }}>
            <Text style={styles.title}>
              NTPOS
            </Text>
            <View style={styles.bodyMain}>
              <Text style={{ fontSize: 40, color: COLORS.darkGreen, fontWeight: 'bold', marginBottom: 20 }}>
                Đăng ký
              </Text>
              <Field
                widthInput={'90%'}
                placeholder={"Tên đăng nhập"}
                autoCorrect={false}
                onChangeText={UserName => setUserName(UserName)}
              />
              <Field
                widthInput={'90%'}
                autoCorrect={false}
                placeholder={"Địa chỉ"}
                onChangeText={userAddress => setUserAddress(userAddress)} />
              <Field
                widthInput={'90%'}
                autoCorrect={false}
                onShowPassword={handlePasswordVisibility}
                eye={rightIcon}
                placeholder={"Mật khẩu"}
                secureTextEntry={isPasswordSecure}
                onChangeText={UserPassword => setUserPassword(UserPassword)
                }
              />
              <Field
                widthInput={'90%'}
                autoCorrect={false}
                onShowPassword={handleRetyPasswordVisibility}
                eye={rightIconRety}
                placeholder={"Nhập lại mật khẩu"}
                secureTextEntry={isPasswordRetySecure}
                onChangeText={UserPassword => setUserPassword(UserPassword)
                }
              />
              <Field
                widthInput={'90%'}
                placeholder={"Gmail"}
                keyboardType={"email-address"}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                autoCorrect={false}
              />
              <Btn marginTop={40} width={250} borderColor={COLORS.darkGreen} bgColor={COLORS.darkGreen} fontSize={20} textColor={COLORS.color_white} title={'Đăng ký'} onPress={() => {
                handleSubmitPress(userEmail, userPassword)
              }} />
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Có một tài khoản ? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                  <Text style={{ color: COLORS.darkGreen, fontWeight: 'bold', fontSize: 16 }}>Đăng nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Background>
  );
};
export default RegisterScreen;

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
    height: heightScreen - 74,
    width: widthScreen,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: 'center'
  }
});

