import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollViewBase, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { ButtonComponent, InputComponent } from "../../components";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {  editTableOrderRequest } from "../../redux_store/orders/ordersSilce";
import { calculateQuality, calculateTotalPrice, formatDateFromNumber } from "../../utils/function";
import { detailOrderReturn } from "../../redux_store/order_return/OrderReturnSlice";
import SelectDropdown from "react-native-select-dropdown";
import IconIcons from "react-native-vector-icons/Ionicons";
import { OrderLineItem } from "../../models/order";
import { fetchProductsNull, fetchProductsStart } from "../../redux_store/product/productSlice";
const DetailOrderReturnScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const [number, setNumber] = useState('1');
  const statusType = ["CREATED", "PAYMENT"];
  const dispatch = useDispatch();
  const orderReturn = useSelector((state: RootState) => state.orderReturn.orderReturnService.orderReturn);
  const [status, setStatus] = useState(orderReturn.status);
  const tables = useSelector((state: RootState) => state.table.tableSevice.data);
  const orderLineItems1 : OrderLineItem[]  = orderReturn.orderLineItemsReturn.map((item) => ({
    productID: item.productID,
    price: item.price,
    name: item.name,
    quantity: item.quantity,
    discount:0,
  }));
  const listItems = orderReturn.orderLineItemsReturn.map((item) =>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: COLORS.color_white,
      paddingTop: 10,
      paddingBottom: 10,
    }} key={item.productID}>
      <View>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>{item.name}</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, { color: COLORS.darkGreen, fontSize: responsiveFontSize(2) , fontWeight:'500'}]}>{item.price} x {item.quantity}</Text>
      </View>
      <View style={{ alignItems:'flex-end'}}>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>Tổng tiền sản phẩm</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, { color: COLORS.darkGreen, fontSize: responsiveFontSize(2.1), fontWeight:'500',}]}>{item.price * item.quantity}</Text>
      </View>
    </View>
  );
  const listTables = orderReturn.tablesReturn.map((item) =>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: COLORS.color_white,
      paddingTop: 10,
      paddingBottom: 10,
    }} key={item.tableID}>
      <View>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.3) }]}>{item.name}</Text>
        <Text style={styles.text}>Thời gian bắt đầu</Text>
        <Text style={styles.text}>Thời gian kết thúc</Text>
      </View>
      <View style={{ alignItems:'flex-end'}}>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}></Text>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>{formatDateFromNumber(item.startTime)}</Text>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>{formatDateFromNumber(item.endTime)}</Text>
      </View>
    </View>
  );
  useEffect(() => {
    dispatch(detailOrderReturn(id));
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        scrollEnabled={true}>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="user" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Khách lẻ</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>...</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="group" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Nhóm</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{orderReturn.group}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="sticky-note-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Ghi chú</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{orderReturn.note}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Thời gian</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{formatDateFromNumber(orderReturn.orderReturnDate)}</Text>
          </View>
        </View>
        <View style={[styles.box, {alignItems:'center'}]}>
          <View style={styles.left}>
            <FontAwesome name="skyatlas" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Trạng thái</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={[styles.text,{color: COLORS.color_black, marginRight:10}]}>{status === 'CREATED' ? 'Chưa thanh toán' : 'Đã thanh toán'}</Text>
            <SelectDropdown
              buttonStyle={{backgroundColor:'#ffffff', borderStyle:'solid',borderBottomWidth:1,width:100, height:'auto'}}
              buttonTextStyle={{color:'green', fontSize:12, padding:4}}
              data={statusType}
              onSelect={(selectedValue) => {setStatus(selectedValue); console.log(status)}}
              defaultButtonText={status}
            />
          </View>
        </View>
        <View style={styles.boxListFood}>
          <Text style={[styles.text, { fontSize: responsiveFontSize(1.5), color: COLORS.color_grey, marginBottom:10, marginLeft:10 }]}>Danh sách sản phẩm</Text>
          {listItems}
        </View>
        <View style={styles.boxListFood}>
          <Text style={[styles.text, { fontSize: responsiveFontSize(1.5), color: COLORS.color_grey, marginBottom:10, marginLeft:10  }]}>Danh sách bàn</Text>
          {listTables}
        </View>
        <View style={styles.boxListFood}>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:0}}>
            <Text style={[styles.text, { fontSize: responsiveFontSize(1.5), color: COLORS.color_grey, marginBottom:10, marginLeft:10  }]}>Danh sách bàn</Text>
          </View>
        </View>
        <View style={styles.boxListFood}>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng số lượng sản phẩm</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>

            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền phải trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>

            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng cần trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng đã trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}></Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
          <ButtonComponent title='Cập nhật' onPress={()=>{}} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View>
      </ScrollView >
    </View >
  );
}
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
  container: {
    flex: 1,
    marginBottom:10,
  },
  boxContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  box: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: COLORS.color_white,
    borderBottomWidth: 0.5,
    borderColor: COLORS.color_grey_seconds,
    justifyContent: 'space-between',
  },
  box1: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    marginRight: 10,
  },
  box2: {
    width: responsiveWidth(30),
  },
  box3: {
    width: responsiveWidth(24),
  },
  box4: {
    width: responsiveWidth(20),
    textAlign: 'center'
  },
  text: {
    color: COLORS.color_grey,
    fontSize: responsiveFontSize(2),
  },
  left: {
    flexDirection: 'row'
  },
  boxListFood: {
    marginTop: 10,
  }
});
export default DetailOrderReturnScreen;
