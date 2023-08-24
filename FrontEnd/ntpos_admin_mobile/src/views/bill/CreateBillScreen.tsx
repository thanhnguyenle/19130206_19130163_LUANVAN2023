import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/AntDesign'
import IconIcons from 'react-native-vector-icons/Ionicons'
import { BillComponent, ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SelectDropdown from 'react-native-select-dropdown';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { fetchProductsStart } from '../../redux_store/product/productSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestReadUser } from '../../redux_store/auth/authSlice';
import Toast from 'react-native-toast-message';
import { createOrder } from '../../redux_store/orders/ordersSilce';
import { OrderLineItem, OrderTable } from "../../models/order";
import LoadingScreen, { loaderRef, showLoader } from "../../components/LoadingScreen";
import { calculateTotalPrice } from "../../utils/function";
import IconIocns from "react-native-vector-icons/Ionicons";
import { createReceiptOrderRequest, paymentMethodNull } from "../../redux_store/payment/PaymentSlice";
function formatDateFromNumber(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
const TYPE = {
    ORDER: 'order',
    RECEIPT_ORDERS: 'receiptOrders',
}
const AddOrderScreen = ({ navigation }: any) => {
    const statusType = ["CREATED", "PAYMENT"];
    const statusTypePTC = ["COMPLETED"];
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.auth.user);
    const products = useSelector((state: RootState) => state.product.productsSevice.products);
    const [userId, setUserId] = useState(user.id);
    const [group, setGroup] = useState<string>('NHANVIEN');
    const [tables, setTables] = useState<OrderTable[]>([]);
    const currentDate = new Date();
    const [orderDate, setOrderDate] = useState(formatDateFromNumber(currentDate.getTime()));
    const [status, setStatus] = useState(statusType[0]); // PAYMENT
    const [statusPTC, setStatusPTC] = useState(statusTypePTC[0]); // PAYMENT
    const [note, setNote] = useState('');
    const [number, setNumber] = useState('1');
    const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
    const [type, setType] = useState(TYPE.ORDER);
    const [totalReturn, setTotalReturn] = useState(0);
    const [totalReceive, setTotalReceive] = useState(0);
    const [total, setTotal] = useState(0);
    const [description, setDescription] = useState('');
    const method = useSelector((state: RootState) => state.payment.paymentReturnService.method);
    const orderLineItems : OrderLineItem[]  = cartItems.map((item) => ({
        productID: item.id,
        price: item.price,
        name: item.name,
        quantity: item.quantity,
        discount:0,
    }));
    useEffect(() => {
        dispatch(paymentMethodNull());
        dispatch(fetchProductsStart());
    }, [dispatch]);
    const addToCart = (productId: string, name: string, price: number, quantity: number) => {
        const existingCartItem = cartItems.find((item) => item.id === productId);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity + quantity };
                } else {
                    return item;
                }
            });
            setCartItems(updatedCartItems);
            setNumber(1 + '');
            console.log(updatedCartItems);
        } else {
            const newCartItem = { id: productId, name: name, price: price, quantity: quantity };
            setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
            setNumber(1 + '');
        }
    };
    const removeFromCart = (productId: string) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };
    async function handleCreate(){
        dispatch(createReceiptOrderRequest(
          {
              orderID:'',
              total:total,
              totalReceive: totalReceive,
              totalReturn: totalReturn,
              status: statusPTC,
              description:description,
              paymentType:`${method}`,
              accountReceive:'',
              accountSend:''
          }
        ))
        navigation.replace('Bill')
    }
    async function handleContinue() {
        try {
            if (cartItems.length > 0) {
                dispatch(createOrder({userID: userId,group,orderDate:currentDate.getTime()+'',note,status,orderLineItems,tables}));
                const order = {
                    orderLineItems: orderLineItems,
                };
                const jsonString = JSON.stringify(order);
                const key = 'orderLineItems';
                await AsyncStorage.setItem(key, jsonString);
                navigation.push('SelectTableScreen')
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
        <View style={styles.container}>
            <View style={{ marginVertical: 10, }}>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <View style={type == 'order' ? styles.bgButton : styles.bgButton1}>
                        <TouchableOpacity onPress={() => { setType(TYPE.ORDER) }}>
                            <Text style={styles.textButton}>Hoán đơn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={type == 'receiptOrders' ? styles.bgButton : styles.bgButton1}>
                        <TouchableOpacity onPress={() => { setType(TYPE.RECEIPT_ORDERS) }}>
                            <Text style={styles.textButton}>Phiếu thu chi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                type == 'order' ?
                  <ScrollView>
                      <View style={styles.boxContent}>
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Thông tin đơn hàng</Text>
                          <View style={styles.itemContent}>
                              <Text style={styles.textTitle}>Người tạo</Text>
                              <InputComponent
                                value={userId}
                                onChangeText={setUserId}
                                placeholder=''
                                style={[styles.textContent, { color: 'grey', textAlign: 'left' }]}
                                editable={false}
                              />
                          </View>
                          <View style={styles.itemContent}>
                              <Text style={styles.textTitle}>Nhóm</Text>
                              <InputComponent
                                value={group + ''}
                                onChangeText={setGroup}
                                placeholder='Thời gian'
                                style={[styles.textContent, { color: 'grey', textAlign: 'left' }]}
                                editable={false}
                              />
                          </View>
                          <View style={styles.itemContent}>
                              <Text style={styles.textTitle}>Ngày tạo</Text>
                              <InputComponent
                                value={orderDate}
                                onChangeText={setOrderDate}
                                placeholder='Thời gian'
                                style={[styles.textContent, { color: 'grey', textAlign: 'left' }]}
                                editable={false}
                              />
                          </View>

                          <View style={styles.itemContent}>
                              <Text style={styles.textTitle}>Trạng thái</Text>
                              <SelectDropdown
                                data={statusType}
                                onSelect={(selectedValue) => setStatus(selectedValue)}
                                defaultButtonText={status}
                              />
                          </View>
                      </View>
                      <View style={styles.boxContent}>
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Chọn món</Text>
                          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                              {products.map((item) => (
                                <ProductItem key={item.id} item={item} number={number} setNumber={setNumber} addToCart={addToCart} />
                              ))}
                          </View>
                      </View>
                      <View style={styles.boxContent}>
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Món đã chọn</Text>
                          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                              {cartItems.length === 0 ? <Text style={{ fontSize: 18, color: COLORS.color_grey, fontWeight: '200' }}>Chưa chọn món</Text> :
                                cartItems.map((item) => (
                                  <CartItem key={item.id} item={item} number={number} setNumber={setNumber} removeFromCart={removeFromCart} />
                                ))}
                          </View>
                      </View>
                      <View style={{ alignItems: 'center', flex: 1, marginTop: 10, marginBottom: 30, }}>
                          <ButtonComponent title='Tiếp' onPress={handleContinue} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                      </View>
                  </ScrollView> :
                      <View style={styles.boxContent}>
                          <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Thông tin phiếu thu</Text>
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
                                data={statusTypePTC}
                                onSelect={(selectedValue) => setStatusPTC(selectedValue)}
                                defaultButtonText={statusPTC}
                              />
                          </View>
                          <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 10,padding:10 }}>
                              <ButtonComponent title='Tạo' onPress={handleCreate} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                          </View>
                      </View>
            }
        </View >
    );
};
const ProductItem = ({ item, number, setNumber, addToCart }: any) => {
    return (
        <View style={styles.container1}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    {item.images.length > 0 ? (
                        <Image
                            source={{ uri: item.images[0].url }}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/imageDefauProduct.png')}
                            style={{ width: '100%', height: '100%', borderRadius: 10 }}
                        />
                    )}
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 10 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: COLORS.darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>{item.price}đ</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(1.6), marginBottom: 10 }}>Số lượng</Text>
                    <InputComponent
                        value={number + ''}
                        onChangeText={setNumber}
                        placeholder=''
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            fontSize: 20,
                            borderBottomColor: COLORS.bgGreen,
                            backgroundColor: '#F5F5F5',
                            width: 30,
                        }}
                    />
                </View>
                <View style={styles.box4}>
                    <TouchableOpacity
                        style={{ backgroundColor: COLORS.darkGreen, borderRadius: 30, width: '50%', alignItems: 'center' }}
                        onPress={() => addToCart(item.id, item.name, item.price, parseInt(number, 10))}
                    >
                        <IconIcons name='add' size={30} color={COLORS.color_white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const CartItem = ({ item, removeFromCart }: any) => {
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
                <View style={styles.box4}>
                    <TouchableOpacity
                        style={{ backgroundColor: COLORS.color_red, borderRadius: 50, width: '45%', alignItems: 'center' }}
                        onPress={() => removeFromCart(item.id)}
                    >
                        <IconIcons name='remove' size={26} color={COLORS.color_white} />
                    </TouchableOpacity>
                </View>
            </View>
            <LoadingScreen ref={loaderRef} />
        </View >
    );
};
const styles = StyleSheet.create({
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
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.1,
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
        color: COLORS.color_black
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
        width: responsiveWidth(30),
    },
    box3: {
        width: responsiveWidth(24),
    },
    box4: {
        width: responsiveWidth(20),
        textAlign: 'center'
    },
});
export default AddOrderScreen;
