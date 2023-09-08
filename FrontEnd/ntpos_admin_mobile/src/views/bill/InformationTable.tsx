import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import IconIocns from "react-native-vector-icons/Ionicons";
import { ButtonComponent, InputComponent } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { detailOrder, editTableOrderRequest } from "../../redux_store/orders/ordersSilce";
import Toast from "react-native-toast-message";
import { OrderLineItem, OrderTable } from "../../models/order";
import { RootState } from "../../app/store";
import { createReceiptOrderRequest, paymentMethodNull } from "../../redux_store/payment/PaymentSlice";
import { calculateTotalPrice } from "../../utils/function";

function formatDateTimeFromNumber(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year} `;
}

const InformationOrderScreen = ({ route, navigation }: any) => {
    const { id, name } = route.params;
    const order = useSelector((state: RootState) => state.order.orderSevice.orderDetail);
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    const currentDateStart = new Date();
    const currentDateEnd = new Date(); // Tạo một bản sao của currentDateStart
    currentDateEnd.setHours(currentDateEnd.getHours() + 2);
    const [timeStart, setTimeStart] = useState(formatDateTimeFromNumber(currentDateStart.getTime()/1000));
    const [timeEnd, setTimeEnd] = useState(formatDateTimeFromNumber(currentDateEnd.getTime()/1000));
    const [orderLineItems, setOrderLineItems] = useState<OrderLineItem[]>([]);
    const [note, setNote] = useState(order.note);
    const method = useSelector((state: RootState) => state.payment.paymentReturnService.method);
    const [tables, setTable] = useState<OrderTable[]>([]);
    const [totalReturn, setTotalReturn] = useState(0);
    const [totalReceive, setTotalReceive] = useState(0);
    const [total, setTotal] = useState(calculateTotalPrice(order.orderLineItems));
    const orderLineItems1 : OrderLineItem[]  = order.orderLineItems.map((item) => ({
        productID: item.productID,
        price: item.price,
        name: item.name,
        quantity: item.quantity,
        discount:0,
    }));
    const tablesFormat : OrderTable[]  =tables.map((item) => ({
        tableID:item.tableID,
        name:item.name,
        note:item.note,
        endTime:item.endTime,
        status:item.status ,
        startTime:item.startTime,
    }));
    useEffect(() => {
        setTotal(calculateTotalPrice(order.orderLineItems));
        AsyncStorage.getItem('orderID').then(orderID => {
            if (orderID != null) {
                setOrderId(orderID);
                console.log(orderID);
                dispatch(detailOrder(orderID));
                console.log('Test')
            }
        });
    }, [])
    useEffect(() => {
        dispatch(paymentMethodNull());
        AsyncStorage.getItem('orderLineItems').then(orderData => {
            if (orderData != null) {
                const parsedOrderData = JSON.parse(orderData);
                console.log('Minh Nhu');
                const orderLineItems = parsedOrderData.orderLineItems;
                console.log(orderData);
                console.log(orderLineItems);
                setOrderLineItems(orderLineItems);
            }
        });
    }, [])


     const handlePayment = () => {
                 const table = {tableID: id, name: name,  note: '',    status: '',startTime:  Math.floor(currentDateStart.getTime() / 1000),  endTime:  Math.floor(currentDateEnd.getTime() / 1000)};
                 tables.push(table);
                 setTable(tables);
                 console.log(tables)
                 dispatch(editTableOrderRequest({
                    id:orderId,
                    userID:order.userID,
                    group:order.group,
                    orderDate:order.orderDate,
                    status:"PAYMENT",
                    note:note,
                    orderLineItems:orderLineItems1,
                    tables:tables,
                }));
                 dispatch(createReceiptOrderRequest(
                   {
                       orderID:orderId,
                       total:calculateTotalPrice(order.orderLineItems),
                       totalReceive: totalReceive,
                       totalReturn: totalReturn,
                       status: 'COMPLETED',
                       description:'',
                       paymentType:`${method}`,
                       accountReceive:'',
                       accountSend:''
                   }
                 ))
                console.log('hello')
                alert('Payment successfull...!!!');
                navigation.replace('Bill')
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.boxContent}>
                    <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom: 10 }}>{name}</Text>
                    <View style={[styles.itemContent,]}>
                        <Text style={{ fontSize: 18, color: COLORS.color_black, fontWeight: '400' }}>Thời gian bắt đầu: </Text>
                        <InputComponent
                            value={timeStart + ''}
                            onChangeText={setTimeStart}
                            placeholder=''
                            style={[styles.textContent, { color: 'grey', textAlign: 'left' }]}
                            editable={false}
                        />
                    </View>
                    <View style={[styles.itemContent,]}>
                        <Text style={{ fontSize: 18, color: COLORS.color_black, fontWeight: '400' }}>Thời gian kết thúc: </Text>
                        <InputComponent
                            value={timeEnd + ''}
                            onChangeText={setTimeEnd}
                            placeholder=''
                            style={[styles.textContent, { color: 'grey', textAlign: 'left' }]}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.boxContent}>
                    <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom: 12 }}>Danh sách món đã chọn</Text>
                    <View style={styles.boxContent}>
                        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                            {orderLineItems.length === 0 ? <Text style={{ fontSize: 18, color: COLORS.color_grey, fontWeight: '200' }}>Chưa chọn món</Text> :
                                orderLineItems.map((item) => (
                                    <CartItem key={item.productID} item={item} />
                                ))}
                        </View>
                    </View>
                </View>
                <View style={styles.boxContent}>
                    <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:2 }}>Ghi chú</Text>
                    <InputComponent
                        value={note}
                        onChangeText={setNote}
                        placeholder=''
                        style={styles.textContent}
                    />
                </View>
                <View style={[styles.boxContent, { flexDirection: 'row', justifyContent: 'flex-start',alignItems:'center'}]}>
                    <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom: 2 }}>Thanh toán</Text>
                    <TextInput style={[styles.textContent, { width: '60%',fontSize: 14 ,textAlign: 'center'},]} editable={false} placeholder='chọn phương thức thanh toán' aria-disabled>{method !== null ? method === 'COD'? 'Thanh toán tiền mặt': 'Thanh toán với Paypal':''}</TextInput>
                    <TouchableOpacity onPress={() => {navigation.push('SelectMethodPaymentScreen')}} style={{ width: '10%', }}>
                        <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                    </TouchableOpacity>
                </View>
                {
                    method == 'COD' ?
                      <View style={[styles.boxContent,{width: '100%'}]}>
                          <View style={{width: '100%'}}>
                              <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:1 }}>Tổng tiền phiếu thu</Text>
                              <InputComponent
                                value={total+''}
                                onChangeText={setTotal}
                                placeholder=''
                                style={styles.textContent}
                              />
                          </View>
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:1, marginTop:10 }}>Số tiền nhận của khách</Text>
                          <InputComponent
                            value={totalReceive+''}
                            onChangeText={setTotalReceive}
                            placeholder=''
                            style={styles.textContent}
                          />
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:1 }}>Số tiền trả lại khách</Text>
                          <InputComponent
                            value={totalReturn+''}
                            onChangeText={setTotalReturn}
                            placeholder=''
                            style={styles.textContent}
                          />
                      </View> : <View></View>
                }
                <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
                    <ButtonComponent title='Thanh toán' onPress={handlePayment} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const CartItem = ({ item }: any) => {
    return (
        <View style={styles.container1}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    <Image
                        source={require('../../assets/imageDefauProduct.png')}
                        style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 10 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: COLORS.darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>{item.price}đ</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(1.6), marginBottom: 10 }}>Số lượng</Text>
                    <Text style={{ color: COLORS.color_black, fontWeight: '600', fontSize: responsiveFontSize(2), marginBottom: 10 }}>{item.quantity}</Text>
                </View>
            </View>
        </View >
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
        width:'100%',
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
        width: '100%',
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
        width: responsiveWidth(45),
    },
    box3: {
        width: responsiveWidth(24),
    },
    box4: {
        width: responsiveWidth(20),
        textAlign: 'center'
    },
});
export default InformationOrderScreen;
