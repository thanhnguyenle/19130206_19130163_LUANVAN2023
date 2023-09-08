import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet,FlatList, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {  fetchReceiptOrdersStart } from "../../redux_store/payment/PaymentSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { formatDateFromNumber, formatPrice, generateFourDigitCode, shortenOrderID } from "../../utils/function";
import { fetchOrdersStart } from "../../redux_store/orders/ordersSilce";
import { fetchPaySlipOrdersStart } from "../../redux_store/order_return/OrderReturnSlice";
import Swipeable from "react-native-gesture-handler/Swipeable";
const TYPE = {
  PhieuThu: 'PhieuThu',
  PhieuChi: 'PhieuChi',
}
const CashBookScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const receiptOrders = useSelector((state: RootState) => state.payment.paymentReturnService.listReceiptOrder);
  const paySlipOrders = useSelector((state: RootState) => state.orderReturn.orderReturnService.paySlipOrders);
  const [type, setType] = useState(TYPE.PhieuChi);
  useEffect(() => {
    dispatch(fetchReceiptOrdersStart());
    dispatch(fetchPaySlipOrdersStart());
  }, [dispatch]);
    return (
        <View  style={styles.container}>
          <View style={{ marginVertical: 10, }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
              <View style={type == TYPE.PhieuChi ? styles.bgButton : styles.bgButton1}>
                <TouchableOpacity onPress={() => { setType(TYPE.PhieuChi); dispatch(fetchPaySlipOrdersStart()); }}>
                  <Text style={styles.textButton}>Phiếu chi</Text>
                </TouchableOpacity>
              </View>
              <View style={type == TYPE.PhieuThu ? styles.bgButton : styles.bgButton1}>
                <TouchableOpacity onPress={() => { setType(TYPE.PhieuThu); dispatch(fetchReceiptOrdersStart()); }}>
                  <Text style={styles.textButton}>Phiếu thu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {type == 'PhieuChi' ?
          <FlatList
            style={{ flex: 1, width: '100%', marginBottom: 20 }}
            data={receiptOrders}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                  <View style={styles.container1} key={item.id}>
                    <TouchableOpacity onPress={() => { navigation.push('DetailReceiptOrderScreen',{id: item.id}) }}>
                      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={styles.box1}>
                          <Image source={require('../../assets/phieuthuchi.png')} style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'contain' }} />
                        </View>
                        <View style={styles.box2}>
                          <Text style={{ color: COLORS.darkGreen, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>PTC{generateFourDigitCode(index+1)}</Text>
                          <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{shortenOrderID(item.orderID)}</Text>
                        </View>
                        <View style={styles.box3}>
                          <Text style={{ color: COLORS.darkGreen, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>{formatPrice(item.total)}</Text>
                          <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{formatDateFromNumber(parseInt(item.createdAt))}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              )
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
            }}
          /> :
            <FlatList
              style={{ flex: 1, width: '100%' }}
              data={paySlipOrders}
              keyExtractor={(item) => item.id}
              renderItem={({ item , index}) => {
                return (
                    <View style={styles.container1} key={item.id}>
                      <TouchableOpacity onPress={() => { navigation.push('DetailPaySlipOrderScreen', { id: item.id }) }}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                          <View style={styles.box1}>
                            <Image source={require('../../assets/phieutrahang.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                          </View>
                          <View style={styles.box2}>
                            <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.2) }]}>TH{generateFourDigitCode(index+1)}</Text>
                            <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(2) }]}>{item.total}</Text>
                          </View>
                          <View style={styles.box3}>
                            <View style={{ justifyContent: 'flex-end' }}>
                              <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>{shortenOrderID(item.orderReturnID)}</Text>
                              <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(1.7) }]}>{item.status}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                )
              }}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
              }}
            />
          }
        </View>
    );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.darkGreen,
    borderRadius: 40,
  },
  container: {
    flex: 1
  },
  boxFifter: {
    paddingTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginBottom: responsiveHeight(0),
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  boxTitle: {
    flexDirection: 'row',
    marginRight: responsiveWidth(5),
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: COLORS.color_grey,
  },
  title: {
    marginBottom: responsiveHeight(1),
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
  },
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
  box1: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
  },
  box2: {
    width: responsiveWidth(40),
  },
  box3: {
    width: responsiveWidth(20),
  },
  deleteBox: {
    height: '100%',
    padding: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f04d4f',
  },
  bgButton: {
    padding: 20,
    backgroundColor: COLORS.color_white,
    border: 1,
    borderColor: COLORS.darkGreen,
    marginHorizontal: 10,
    width: '44%',
    elevation: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderBottomColor: COLORS.darkGreen,
    borderWidth: 1,
  },
  bgButton1: {
    padding: 20,
    backgroundColor: COLORS.color_white,
    border: 1,
    borderColor: COLORS.darkGreen,
    width: '44%',
    marginHorizontal: 10,
    elevation: -1,
    borderRadius: 10,
    alignItems: 'center'
  },
  textButton: {
    color: COLORS.darkGreen,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
})
export default CashBookScreen;
