import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import IconIcons from 'react-native-vector-icons/Ionicons'
import { ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SelectDropdown from 'react-native-select-dropdown';
import LoadingScreen, { loaderRef, showLoader } from "../../components/LoadingScreen";
import IconIocns from "react-native-vector-icons/Ionicons";
import { createReceiptOrderRequest } from "../../redux_store/payment/PaymentSlice";
import { createPaySlipOrder } from "../../redux_store/order_return/OrderReturnSlice";

const TYPE = {
  ORDER: 'orderReturn',
  PAYSLIP_ORDERS: 'PaySlipOrder',
}
const AddOrderReturnScreen1 = ({ navigation }: any) => {
  const statusTypePC = ["COMPLETED"];
  const dispatch = useDispatch();
  const [statusPC, setStatusPC] = useState(statusTypePC[0]);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalReceive, setTotalReceive] = useState(0);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');
  const method = useSelector((state: RootState) => state.payment.paymentReturnService.method);
  async function handleCreate(){
    dispatch(createPaySlipOrder(
      {
        orderReturnID:'',
        total:total,
        totalReceive: totalReceive,
        totalReturn: totalReturn,
        status: statusPC,
        description:description,
        paymentType:`${method}`,
        accountReceive:'',
        accountSend:''
      }
    ))
    navigation.replace('ExportProduct')
  }
  return (
    <View style={styles.container}>
      <View style={styles.boxContent}>
        <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Thông tin phiếu chi</Text>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Tổng tiền</Text>
          <InputComponent
            value={total + ''}
            onChangeText={setTotal}
            placeholder='Tổng tiền hóa đơn'
            style={[styles.textContent]}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Số tiền nhận của khách</Text>
          <InputComponent
            value={totalReceive+''}
            onChangeText={setTotalReceive}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Số tiền trả cho khách</Text>
          <InputComponent
            value={totalReturn+''}
            onChangeText={setTotalReturn}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Ghi chú</Text>
          <InputComponent
            value={description+''}
            onChangeText={setDescription}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={[styles.itemContent, { flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center'}]}>
          <Text style={styles.textTitle}>Thanh toán</Text>
          <TextInput style={[styles.textContent, { width: '60%',fontSize: 14 ,textAlign: 'center'},]} editable={false} placeholder='chọn phương thức thanh toán' aria-disabled>{method !== null ? method === 'COD'? 'Thanh toán tiền mặt': 'Thanh toán với Paypal':''}</TextInput>
          <TouchableOpacity onPress={() => {navigation.push('SelectMethodPaymentScreen')}} style={{ width: '10%', }}>
            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Trạng thái</Text>
          <SelectDropdown
            buttonStyle={{backgroundColor:'#ffffff', borderStyle:'dotted',borderBottomWidth:0.4,width:'60%', height:'auto'}}
            buttonTextStyle={{color:'green', fontSize:12, padding:4}}
            data={statusTypePC}
            onSelect={(selectedValue) => setStatusPC(selectedValue)}
            defaultButtonText={statusPC}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 10,padding:10 }}>
          <ButtonComponent title='Tạo' onPress={handleCreate} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  textContent: {
    width: '70%',
    fontSize: responsiveFontSize(2.3),
    borderBottomWidth: 0.6,
    borderColor: COLORS.color_grey_seconds,
    paddingBottom: 10,
    color: COLORS.color_black,
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
    color: COLORS.color_black
  },
})
export default AddOrderReturnScreen1;
