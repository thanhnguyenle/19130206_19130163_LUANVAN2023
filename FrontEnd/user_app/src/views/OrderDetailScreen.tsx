import React, {useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity, Image,
    Linking
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../constants/common';
import ButtonComponent from '../components/ButtonComponent';
import {formatDateFromNumber, formatDateFromNumberHour, formatPrice, shortenOrderID} from "../utils/function";
import {paymentMethodNull} from "../redux/payment/PaymentSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {fetchDetailUserRequest} from "../redux/order/orderSlice";
import {responsiveFontSize, responsiveWidth} from "react-native-responsive-dimensions";
import {OrderLineItem} from "../model/order";

interface OrderDetailProps {
    navigation: any;
    route: any;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ navigation, route }) => {
    const { order } = route.params;
    const dispatch = useDispatch();
    const userDetail = useSelector((state: RootState) => state.order.orders.userDetail);
    function stringStatus(status: string) {
        if (status === 'PAYMENT') {
            return 'Đã hoàn thành';
        } else if (status === 'CREATED') {
            return 'Chưa hoàn thành';
        } else if (status === 'CANCER') {
            return 'Đã hủy';
        }
    }
    useEffect(() => {
        dispatch(fetchDetailUserRequest(order.userID));
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.boxStatus}>
                    <View style={styles.itemStatus}>
                        <Icons
                            name="downcircleo"
                            size={22}
                            style={{ color: COLORS.darkGreen }}
                        />
                        <Text style={{ color: COLORS.color_black, marginTop: 10,letterSpacing:1, }}>
                            Chờ xác nhận
                        </Text>
                    </View>
                    <View style={styles.icon}>
                        <Icons name="minus" size={22} style={{ color: COLORS.color_grey }} />
                    </View>
                    <View style={styles.itemStatus}>
                        <Icons
                            name="downcircleo"
                            size={22}
                            style={{ color: COLORS.darkGreen }}
                        />
                        <Text style={{ color: COLORS.color_black, marginTop: 10,letterSpacing:1, }}>
                            Đã xác nhận
                        </Text>
                    </View>
                    <View style={styles.icon}>
                        <Icons name="minus" size={22} style={{ color: COLORS.color_grey }} />
                    </View>
                    <View style={styles.itemStatus}>
                        <Icons
                            name="downcircleo"
                            size={22}
                            style={{ color: COLORS.darkGreen }}
                        />
                        <Text style={{ color: COLORS.color_black, marginTop: 10,letterSpacing:1, }}>
                            Đã hoàn thành
                        </Text>
                    </View>
                </View>
                <View style={styles.boxTextStatus}>
                    <Text style={styles.titleStatus}>{stringStatus(order.status)}</Text>
                </View>
                <View style={styles.information}>
                    <Text style={styles.subTitle}>Đơn hàng: {shortenOrderID(order.id)}</Text>
                    <TouchableOpacity  onPress={()=>{Linking.openURL('tel:0365448301')}}
                        style={[styles.buttonItem, { backgroundColor: '#097ebd' }]}
                    >
                        <Text style={{ color: COLORS.color_white }}>Liên hệ</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.informationDetail,{zIndex:2}]}>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Khách hàng:
                        </Text>
                        <Text style={styles.subTitleDetail}>
                            {userDetail.name}
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Số điện thoại:
                        </Text>
                        <Text style={styles.subTitleDetail}>
                            {userDetail.phoneNumber}
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Địa chỉ:
                        </Text>
                        <Text style={styles.subTitleDetail}>
                            {userDetail.address}
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Gmail:
                        </Text>
                        <Text style={styles.subTitleDetail}>
                           {userDetail.email}
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>Tên bàn:</Text>
                        <Text style={styles.subTitleDetail}>{order.tables.length > 0 ? order.tables[0].name : '...'}</Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Thời gian bắt đầu :
                        </Text>
                        <Text style={styles.subTitleDetail}>
                            {order.tables.length > 0 ? formatDateFromNumberHour(order.tables[0].startTime) : '...'}
                        </Text>
                    </View>
                    <View style={styles.itemText}>
                        <Text style={styles.subTitleDetail}>
                            Thời gian kết thúc :
                        </Text>
                        <Text style={styles.subTitleDetail}>
                            {order.tables.length > 0 ? formatDateFromNumberHour(order.tables[0].endTime) : '...'}
                        </Text>
                    </View>
                </View>
                <View style={[styles.informationDetail,{zIndex:2, marginTop:20}]}>
                    <Text style={{ color: COLORS.color_black }}>Danh sách món</Text>
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                        {order.orderLineItems.length === 0 ? <Text style={{ fontSize: 18, color: COLORS.color_grey, fontWeight: '200' }}>Chưa chọn món</Text> :
                            order.orderLineItems.map((item:OrderLineItem) => (
                                <View style={styles.container1} key={item.productID}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <View style={styles.box1}>
                                            <Image source={require("../assets/images/imageDefauProduct.png")} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
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
            </ScrollView>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 30,
                }}
            >
                <ButtonComponent title='Đặt lại' containerStyle={{backgroundColor:COLORS.darkGreen, paddingHorizontal:40}} onPress={() => { }} />
            </View>
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    box1: {
        width: responsiveWidth(18),
        height: responsiveWidth(18),
        marginRight: 10,
    },
    box2: {
        width: responsiveWidth(42),
    },
    box3: {
        width: responsiveWidth(40),
    },
    box4: {
        width: responsiveWidth(20),
        textAlign: 'center'
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
    itemText:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:4,

    },
    container: {
        flex: 1,
        backgroundColor:COLORS.color_white,
    },
    boxStatus: {
        flexDirection: 'row',
        height: height / 8,
        justifyContent: 'center',
    },
    itemStatus: {
        flexDirection: 'column',
        width: '25%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    icon: {
        width: '10%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    boxTextStatus: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStatus: {
        fontSize: 30,
        fontWeight: '600',
        color: COLORS.darkGreen,
        letterSpacing:1,
    },
    information: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20,

    },
    buttonItem: {
        backgroundColor: 'red',
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    subTitle: {
        fontSize: 20,
        color: '#000000',
        letterSpacing:1,
    },
    informationDetail: {
        marginHorizontal: 10,
        marginVertical: 0,
        borderColor:COLORS.darkGreen,
        borderWidth:2,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        borderRadius:10,
    },
    subTitleDetail: {
        fontSize: 17,
        color: COLORS.color_black,
        marginTop: 3,
        letterSpacing:1,
        fontWeight:'300'
    },
});

export default OrderDetail;
