import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { FlatList, Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { BillComponent, BottomSheet, RadioButtonCom } from "../../components";
import IconIcons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import LoadingScreen, { hideLoader, loaderRef, showLoader } from "../../components/LoadingScreen";
import { formatDateFromNumber, formatPrice, generateFourDigitCode, shortenOrderID } from "../../utils/function";
import { deleteOrder, deleteOrderNull, fetchOrdersStart } from "../../redux_store/orders/ordersSilce";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";
import {
  requestMaterialsAll,
  requestMaterialsSetup,
  requestXuatKho
} from "../../redux_store/cancellation/CancellationSlice";
import { detailInventoryNull, detailInventoryRequest } from "../../redux_store/inventory/InventorySlice";
import { it } from "node:test";

const CancellationScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const listMaterials = useSelector((state: RootState) => state.inventory.cancellationService.listMaterials);
  useEffect(() => {
    dispatch(requestMaterialsSetup());
  }, []);
    return (
        <View style={styles.container}>
          <View style={styles.boxFifter}>
            <TouchableOpacity onPress={async ()=> { await dispatch(requestMaterialsSetup());}}>
              <Text style={{fontSize:16, fontWeight:'500', color:COLORS.darkGreen}}>Tải</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.replace('EstablishScreen')}}>
              <Text style={{fontSize:16, fontWeight:'500', color:COLORS.darkGreen}}>Thiết lập</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, width: '100%', alignItems: 'center', paddingHorizontal:20 }}>
            {listMaterials.length > 0 ? listMaterials.map((item, index) => (
              <View key={item.unit+index} style={styles.itemMa}>
                <View style={styles.box1}>
                  <Image source={require('../../assets/nguyenlieu4.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </View>
                <View style={styles.box2}>
                  <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.3) }]}>{item.name +''}</Text>
                </View>
                <View style={styles.box3}>
                  <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>Mặc định</Text>
                  <View style={{ justifyContent: 'flex-start' , flexDirection:'row'}}>
                    <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>{item.quantity +''}</Text>
                    <Text> </Text>
                    <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(2) }]}>{item.unit +''}</Text>
                  </View>
                </View>
              </View>
            )) : <View></View>}
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => { dispatch(requestXuatKho())}} style={styles.button1}>
              <Text style={{padding:10, color:COLORS.color_white,fontWeight:'500'}}>Xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.push('ExportMaterialScreen') }} style={styles.button1}>
              <Text style={{padding:10, color:COLORS.color_white,fontWeight:'500'}}>Nhập</Text>
            </TouchableOpacity>
          </View>
          <LoadingScreen ref={loaderRef} />
        </View>
    );
};
const styles = StyleSheet.create({
  button1:{
    backgroundColor:COLORS.darkGreen,
    borderRadius: 40,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    gap:10,
  },
  container: {
    flex: 1
  },
  boxFifter: {
    paddingTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
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
    width: responsiveWidth(44),
  },
  box3: {
    width: responsiveWidth(30),
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
  itemMa:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:COLORS.color_white,
    paddingHorizontal:10,
    paddingVertical:4
  }
})
export default CancellationScreen;
