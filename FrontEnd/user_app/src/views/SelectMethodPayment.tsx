import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Alert, Modal } from "react-native";
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import WebView, { WebViewNavigation } from "react-native-webview";
import { WebViewSource } from "react-native-webview/lib/WebViewTypes";
import paypalApi from "../utils/paypalApi";
import queryString from 'query-string';
import {paymentMethod, paymentMethodNull} from "../redux/payment/PaymentSlice";
import {COLORS} from "../constants/common";
import ButtonComponent from "../components/ButtonComponent";
const SelectMethodPaymentScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [paypalUrl,setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    dispatch(paymentMethodNull());
    },[]);
  const onPressPaypal = async () => {
    try {
      const token = await paypalApi.generateToken();
      setAccessToken(token+'');
      const res = await paypalApi.createOrder(token+'');
      console.log("res+++++", res);
      if(!!res?.links){
        const findUrl = res.links.find(data => data?.rel == "approve")
        setPaypalUrl(findUrl.href);
      }
    }catch (error){
      console.log("error", error)
    }
  }
  const onChange =(webviewState:WebViewNavigation)=>{
    console.log("webviewStatevwebviewState", webviewState);
    if(webviewState.url.includes('https://example.com/cancel')){
      clearPaypalState();
      return;
    }
    if(webviewState.url.includes('https://example.com/return')){
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      const {token} = urlValues.query
      if(!!token){
        paymentSuccess(token + '').then(r =>  {
          alert('Payment successfull...!!!');
          navigation.replace('Bill');
        }
       );
      }
    }
  }
  const source: WebViewSource = { uri: paypalUrl };
  const clearPaypalState = () => {
    setPaypalUrl('');
    setAccessToken('');
  }
  const paymentSuccess = async (id:string) =>{
    try{
      const res = await paypalApi.capturePayment(id,accessToken);
      console.log("Payment +++++++++"+res);
      clearPaypalState();
    }catch (error){
      console.log('error raised in payment capture', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => {
          dispatch(paymentMethod('COD'));
          navigation.pop();
        }}
        >
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={styles.box1}>
              <Image source={require('../assets/images/paymethod.png')} style={{ width: '100%', height: '100%', borderRadius: 10,resizeMode:'center' }} />
            </View>
            <View style={styles.box2}>
              <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>Thanh toán tiền mặt</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => {
          dispatch(paymentMethod('ZALOPAY'));
          navigation.pop();
        }}
        >
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={styles.box1}>
              <Image source={require('../assets/images/ZaloPay-ngang.png')} style={{ width: '100%', height: '100%', borderRadius: 10,resizeMode:'center' }} />
            </View>
            <View style={styles.box2}>
              <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>Thanh toán ZaloPay</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => {
          dispatch(paymentMethod('PAYPAL'));
          onPressPaypal();
        }}
        >
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={styles.box1}>
              <Image source={require('../assets/images/paypad.png')} style={{ width: '100%', height: '100%', borderRadius: 10,resizeMode:'center' }} />
            </View>
            <View style={styles.box2}>
              <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>Thanh toán qua paypal </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
        <ButtonComponent title='Bỏ qua' onPress={()=>{navigation.pop()}} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
      </View>
      <Modal visible={!!paypalUrl}>
        <TouchableOpacity style={{marginTop:14, marginLeft:10}} onPress={clearPaypalState}>
              <Text style={{fontSize:20,color:COLORS.color_black, fontWeight:'500'}}>Đóng</Text>
        </TouchableOpacity>
        <View style={{flex:1}}>
          <WebView
            source={source}
            onNavigationStateChange={onChange}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container1: {
    textAlign: 'center',
    borderRadius: 5,

    width: '99.1%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    backgroundColor: COLORS.color_white,
  },
  deleteBox: {
    height: '100%',
    padding: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f04d4f',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.darkGreen,
    borderRadius: 40,
  },
  des: {
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  container: {
    flex: 1,
  },
  boxImage: {
    marginTop: 10,
    marginBottom: 10,
    height: '20%',
    alignItems: 'center',
  },
  boxContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    color: COLORS.color_black,
    fontWeight: '500',
    marginBottom: 10,
  },
  itemContent: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTitle: {
    width: '30%',
    fontSize: responsiveFontSize(2.1),
    color: COLORS.color_grey
  },
  textContent: {
    width: '70%',
    fontSize: responsiveFontSize(2.3),
    borderBottomWidth: 0.6,
    borderColor: COLORS.color_grey_seconds,
    paddingBottom: 10,
    color: COLORS.color_black,
  },
  box: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  textDes: {
    fontSize: responsiveFontSize(2),
    color: COLORS.color_black
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
  },
  box1: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    marginRight: 10,
  },
  box2: {
    width: responsiveWidth(68),
  },
  box4: {
    width: responsiveWidth(20),
    textAlign: 'center'
  },
});
export default SelectMethodPaymentScreen;
