import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import {  ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { detailOrder } from "../../redux_store/orders/ordersSilce";
import LoadingScreen, { loaderRef, showLoader } from "../../components/LoadingScreen";
import { createOrderReturn, createPaySlipOrder, idOrderSuccess } from "../../redux_store/order_return/OrderReturnSlice";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { calculateQuality, calculateTotalPrice, formatDateFromNumber } from "../../utils/function";
import { OrderLineItem, OrderTable } from "../../models/order";


const AddOrderReturnScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order.orderSevice.orderDetail);
  const method = useSelector((state: RootState) => state.payment.paymentReturnService.method);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalReceive, setTotalReceive] = useState(0);
  const [total, setTotal] = useState(calculateTotalPrice(order.orderLineItems));
  const orderLineItems : OrderLineItem[]  = order.orderLineItems.map((item) => ({
    productID: item.productID,
    price: item.price,
    name: item.name,
    quantity: item.quantity,
    discount:0,
  }));
  const tables : OrderTable[]  = order.tables.map((item) => ({
    tableID: item.tableID,
    note: item.note,
    status: item.status,
    name : item.name,
    endTime: item.endTime,
    startTime: item.startTime,
  }));
  useEffect(() => {
    dispatch(detailOrder(id));
    dispatch(idOrderSuccess(id));
    setTotal(calculateTotalPrice(order.orderLineItems));
    setTotalReceive(calculateTotalPrice(order.orderLineItems));
  }, []);
  async function handleOrderReturn(){
    dispatch(createOrderReturn({
      orderID : id,
      userID: order.userID,
      group: order.group,
      note: order.note,
      status: 'CREATE',
      orderLineItemsReturn: orderLineItems,
      tablesReturn: tables,
    }));
    dispatch(createPaySlipOrder(
      {
        orderReturnID:id,
        total:total,
        totalReceive: totalReceive,
        totalReturn: totalReturn,
        status: 'COMPLETED',
        description:'',
        paymentType:`${method}`,
        accountReceive:'',
        accountSend:''
      }
    ))
    navigation.replace('Bill')
  }
  const listItems = order.orderLineItems.map((item) =>
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
  const listTables = order.tables.map((item) =>
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
            <Text style={[styles.text,{color: COLORS.color_black}]}>{order.group}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Thời gian</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{formatDateFromNumber(order.orderDate)}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Trạng thái</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{order.status === 'CREATED' ? 'Chưa thanh toán' : 'Đã thanh toán'}</Text>
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
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng số lượng sản phẩm</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {calculateQuality(order.orderLineItems)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền phải trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {calculateTotalPrice(order.orderLineItems)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng cần trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{calculateTotalPrice(order.orderLineItems)}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng đã trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{order.status === 'CREATED' ? 0 : calculateTotalPrice(order.orderLineItems)}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
          <ButtonComponent title='Tạo trả hàng' onPress={handleOrderReturn} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View>
      </ScrollView >
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10,
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
export default AddOrderReturnScreen;
