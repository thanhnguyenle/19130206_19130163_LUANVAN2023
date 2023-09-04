import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import IconIcons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/common';
import { BillComponent, BottomSheet, CheckSheetComponent, RadioButtonCom } from '../../components';
import { RadioButton } from 'react-native-paper';
import { FlatList, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Icon from 'react-native-vector-icons/AntDesign'
import { deleteOrder, deleteOrderNull, fetchOrdersStart } from '../../redux_store/orders/ordersSilce';
import Toast from 'react-native-toast-message';
import LoadingScreen, { hideLoader, loaderRef, showLoader } from '../../components/LoadingScreen';
import { formatDateFromNumber, formatPrice, generateFourDigitCode, shortenOrderID } from "../../utils/function";
import {
    fetchDeleteReceiptOrdersNull,
    fetchDeleteReceiptOrdersStart,
    fetchReceiptOrdersStart
} from "../../redux_store/payment/PaymentSlice";
const TYPE = {
    ORDER: 'orderReturn',
    RECEIPT_ORDERS: 'receiptOrders',
}
const BillScreen = ({ navigation }: any) => {
    const [locThoiGia, setLocThoiGian] = useState('homnay');
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.order.orderSevice.loading);
    const error = useSelector((state: RootState) => state.order.orderSevice.error);
    const orders = useSelector((state: RootState) => state.order.orderSevice.orders);
    const receiptOrders = useSelector((state: RootState) => state.payment.paymentReturnService.listReceiptOrder);
    const [type, setType] = useState(TYPE.ORDER);
    useEffect(() => {
        dispatch(fetchOrdersStart());
        dispatch(deleteOrderNull());
        dispatch(fetchDeleteReceiptOrdersNull());
        dispatch(fetchReceiptOrdersStart());
    }, [dispatch]);
    function getNameTitle(value: string): string {
        let valueNew = '';
        switch (value) {
            case 'homnay':
                valueNew = 'Hôm nay'
                break;
            case 'homqua':
                valueNew = 'Hôm qua'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'tuannnay':
                valueNew = 'Tuần này'
                break;
            case 'tuantruoc':
                valueNew = 'Tuần trước'
                break;
            case 'thangnay':
                valueNew = 'Tháng này'
                break;
            case 'thangtruoc':
                valueNew = 'Tháng trước'
                break;
            default:
                break;
        }
        return valueNew;
    }
    //Animate
    const renderRightActions = (id: string) => (
        <TouchableOpacity style={styles.deleteBox} onPress={() => {
            Alert.alert(
                'Cảnh báo',
                'Bạn có muốn xóa hóa đơn này không?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK', onPress: async () => {
                            try {
                                await dispatch(deleteOrder(id)); // Gọi action để xóa
                                showLoader();
                                setTimeout(() => {
                                    hideLoader();
                                    Toast.show({
                                        type: 'success',// success, error, info, or any
                                        text1: 'Bạn xóa hóa đơn thành công 👋',
                                        position: 'top',
                                    });
                                    dispatch(deleteOrderNull());
                                    dispatch(fetchOrdersStart());
                                }, 500);
                            } catch (error) {
                                hideLoader();
                                Toast.show({
                                    type: 'error',// success, error, info, or any
                                    text1: 'Bạn xóa hóa đơn không thành công 😞',
                                    position: 'top',
                                });
                            }
                        }
                    }
                ]);
        }}>
            <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
        </TouchableOpacity >
    );
    const renderRightActions1 = (id: string) => (
      <TouchableOpacity style={styles.deleteBox} onPress={() => {
          Alert.alert(
            'Cảnh báo',
            'Bạn có muốn xóa phiếu thu này không?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        try {
                            await dispatch(fetchDeleteReceiptOrdersStart(id)); // Gọi action để xóa
                            showLoader();
                            setTimeout(() => {
                                hideLoader();
                                Toast.show({
                                    type: 'success',// success, error, info, or any
                                    text1: 'Bạn xóa phiếu thu thành công 👋',
                                    position: 'top',
                                });
                                dispatch(fetchDeleteReceiptOrdersNull());
                                dispatch(fetchReceiptOrdersStart());
                            }, 500);
                        } catch (error) {
                            hideLoader();
                            Toast.show({
                                type: 'error',// success, error, info, or any
                                text1: 'Bạn xóa phiếu thu không thành công 😞',
                                position: 'top',
                            });
                        }
                    }
                }
            ]);
      }}>
          <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
      </TouchableOpacity >
    );
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return <Text>Lỗi: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 10, }}>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <View style={type == 'orderReturn' ? styles.bgButton : styles.bgButton1}>
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
            <View style={[styles.boxFifter,{marginBottom: 10}]}>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                             icon={<IconIcons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
                             height={460}
                             content={
                                 <RadioButton.Group onValueChange={newLocThoiGia => setLocThoiGian(newLocThoiGia)} value={locThoiGia}>
                                     <RadioButtonCom title='Toàn thời gian' value='toanthoigia' />
                                     <RadioButtonCom title='Hôm nay' value='homnay' />
                                     <RadioButtonCom title='Hôm qua' value='homqua' />
                                     <RadioButtonCom title='Tuần này' value='tuannnay' />
                                     <RadioButtonCom title='Tuần trước' value='tuantruoc' />
                                     <RadioButtonCom title='Tháng này' value='thangnay' />
                                     <RadioButtonCom title='Tháng trước' value='thangtruoc' />
                                 </RadioButton.Group>
                             } />
                <View style={styles.boxTitle}>
                    <Text style={styles.text}>
                        Tổng số
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen }]}>
                        {type == 'orderReturn' ? orders.length : receiptOrders.length}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                {type == 'orderReturn' ?
                <FlatList
                    style={{ flex: 1, width: '100%', marginBottom: 20 }}
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <Swipeable renderRightActions={() => renderRightActions(item.id)}  >
                                <View style={styles.container1}>
                                    <BillComponent billItem={item} navigation={navigation} key={item.id} thutu={index} />
                                </View>
                            </Swipeable>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                    }}
                /> : <FlatList
                    style={{ flex: 1, width: '100%', marginBottom: 20 }}
                    data={receiptOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                          <Swipeable renderRightActions={() => renderRightActions1(item.id)}  >
                              <View style={styles.container1}>
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
                          </Swipeable>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                    }}
                  />
                }
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddBillScreen') }}>
                    <IconIcons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
            <LoadingScreen ref={loaderRef} />
        </View >
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
export default BillScreen;
