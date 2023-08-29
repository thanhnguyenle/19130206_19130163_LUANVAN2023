import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";
import IconIocns from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {COLORS} from "../constants/common";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import {calculateTotalPrice, formatPrice} from "../utils/function";
import {RootState} from "../app/store";
import {paymentMethodNull} from "../redux/payment/PaymentSlice";
import {OrderLineItem, OrderTable} from "../model/order";
import {createOrder} from "../redux/order/orderSlice";
import {logOut} from "../redux/auth/loginSlice";
import {navigateToLogin} from "../redux/navigation/navigationSlice";
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

const OrderInformationScreen = ({ navigation ,route}: any) => {
    const { id,name,numberOfPeople } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.login.user);
    const method = useSelector((state: RootState) => state.payment.paymentReturnService.method);
    const currentDateStart = new Date();
    const currentDateEnd = new Date(); // Tạo một bản sao của currentDateStart
    currentDateEnd.setHours(currentDateEnd.getHours() + 2);
    const [timeStart, setTimeStart] = useState(formatDateTimeFromNumber(currentDateStart.getTime()/1000));
    const [timeEnd, setTimeEnd] = useState(formatDateTimeFromNumber(currentDateEnd.getTime()/1000));
    const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number, imageUrl: string }[]>([]);
    const [note, setNote] = useState('');
    const [tables, setTable] = useState<OrderTable[]>([]);
    const [total, setTotal] = useState(calculateTotalPrice(cartItems));
    const orderLineItems : OrderLineItem[]  = cartItems.map((item) => ({
        productID: item.id,
        price: item.price,
        name: item.name,
        quantity: item.quantity,
        discount:0,
    }));
    // const tablesFormat : OrderTable[]  = tables.map((item) => ({
    //     tableID:item.tableID,
    //     name:item.name,
    //     note:item.note,
    //     endTime:item.endTime,
    //     status:item.status ,
    //     startTime:item.startTime,
    // }));
    useEffect(() => {
        dispatch(paymentMethodNull());
        AsyncStorage.getItem('carts').then(orderData => {
            if (orderData != null) {
                const parsedOrderData = JSON.parse(orderData);
                setCartItems(parsedOrderData);
            }
        });
    }, [])

    const handlePayment = () => {
        const table = {tableID: id, name: name,  note: '',    status: '',startTime:   Math.floor(currentDateStart.getTime() / 1000),  endTime:   Math.floor(currentDateEnd.getTime() / 1000)};
        tables.push(table);
        setTable(tables);
        const tablesFormat : OrderTable[]  = tables.map((item) => ({
            tableID:item.tableID,
            name:item.name,
            note:item.note,
            endTime:item.endTime,
            status:item.status ,
            startTime:item.startTime,
        }));
        try {
            if (cartItems.length > 0) {
                console.log(user.id)
                setTimeout( async() => {
                    dispatch(createOrder({userID: user.id,group: 'KHACHHANG',orderDate: Math.floor(currentDateStart.getTime() / 1000),note,status:'CREATED',orderLineItems,tables:tablesFormat}));
                },1000)
                Toast.show({
                    type: 'success',// success, error, info, or any
                    text1: 'Bạn đã đặt hàng thành công!',
                    position: 'top',
                },);
                console.log(tablesFormat);
                navigation.navigate('Home')
            }
            else {
                Toast.show({
                    type: 'error',// success, error, info, or any
                    text1: 'Bạn cần chọn món 😞',
                    position: 'top',
                },);
            }
        } catch (error) {
            console.error('Lỗi khi lưu đối tượng xuống AsyncStorage:', error);
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.boxContent}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '400', marginBottom: 10 }}>Tên bàn: </Text>
                        <Text style={{ fontSize: 21, color: COLORS.color_black, fontWeight: '700', marginBottom: 10 }}>{name}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '400', marginBottom: 10 }}>Số lượng khách: </Text>
                        <Text style={{ fontSize: 21, color: COLORS.color_black, fontWeight: '700', marginBottom: 10 }}>{numberOfPeople}</Text>
                    </View>
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
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                        {cartItems.length === 0 ? <Text style={{ fontSize: 18, color: COLORS.color_grey, fontWeight: '200' }}>Chưa chọn món</Text> :
                            cartItems.map((item) => (
                                <View style={styles.container1} key={item.id}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <View style={styles.box1}>
                                            <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                        </View>
                                        <View style={styles.box2}>
                                            <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.54), marginBottom:6 }}>{item.name}</Text>
                                            <Text style={{ color: COLORS.darkGreen, fontWeight: '400', fontSize: responsiveFontSize(2.0) }}>Giá: {formatPrice(item.price)}</Text>
                                        </View>
                                        <View style={styles.box3}>
                                            <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(2) , justifyContent:'center'}}>Số lượng: {item.quantity}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
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
                <View style={[styles.boxContent,{width: '100%'}]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:1 }}>Tổng tiền phiếu thu</Text>
                        <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500', marginBottom:1 }}>{calculateTotalPrice(cartItems)}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
                    <ButtonComponent title='Đặt hàng' onPress={handlePayment} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                </View>
            </ScrollView>
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
        width: responsiveWidth(20),
        height: responsiveWidth(18),
        marginRight: 10,
    },
    box2: {
        width: responsiveWidth(40),
    },
    box3: {
        width: responsiveWidth(40),
    },
    box4: {
        width: responsiveWidth(20),
        textAlign: 'center'
    },
});
export default OrderInformationScreen;
