import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { BottomSheet, RadioButtonCom } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import { traDon } from '../product/data';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
    deleteOrderReturns, deleteOrderReturnsNull,
    deletePaySlipOrder,
    deletePaySlipOrderNull, fetchOrderReturnsStart,
    fetchPaySlipOrdersStart
} from "../../redux_store/order_return/OrderReturnSlice";
import { formatDateFromNumber, generateFourDigitCode, shortenOrderID } from "../../utils/function";
import { hideLoader, showLoader } from "../../components/LoadingScreen";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IconIcons from "react-native-vector-icons/Ionicons";
const TYPE = {
    ORDER_RETURN: 'orderReturn',
    PAY_SHIP_ORDER: 'paySlipOrder',
}
const ExportProductScreen = ({ navigation }: any) => {
    const [locThoiGia, setLocThoiGian] = useState('homnay');
    const [type, setType] = useState(TYPE.ORDER_RETURN);
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.orderReturn.orderReturnService.loading);
    const error = useSelector((state: RootState) => state.orderReturn.orderReturnService.error);
    const paySlipOrders = useSelector((state: RootState) => state.orderReturn.orderReturnService.paySlipOrders);
    const orderReturnsList = useSelector((state: RootState) => state.orderReturn.orderReturnService.orderReturnList);
    useEffect(() => {
        dispatch(fetchPaySlipOrdersStart());
        dispatch(fetchOrderReturnsStart());
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
            case 'tuannnay':
                valueNew = 'Tuần này'
                break;
            case 'tuantruoc':
                valueNew = 'Tuần trước'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
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
            'Bạn có muốn xóa sản phẩm này không?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        try {
                            {type == 'orderReturn' ? await dispatch(deleteOrderReturns(id)) : await dispatch(deletePaySlipOrder(id))} // Gọi action để xóa
                            showLoader();
                            setTimeout(() => {
                                hideLoader();
                                Toast.show({
                                    type: 'success',// success, error, info, or any
                                    text1: 'Xóa thành công 👋',
                                    position: 'top',
                                });
                                {type == 'orderReturn' ? dispatch(deleteOrderReturnsNull()) :  dispatch(deletePaySlipOrderNull())}
                                {type == 'orderReturn' ? dispatch(fetchOrderReturnsStart()) :  dispatch(fetchPaySlipOrdersStart())}
                            }, 1000);
                        } catch (error) {
                            console.error('Delete error:', error);
                            hideLoader();
                            Alert.alert(
                              'Thông báo',
                              'Có lỗi xảy ra khi xóa bàn.',
                            );
                        }

                    }
                }
            ]);
      }}>
          <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
      </TouchableOpacity>
    );
    //Animate
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
                        <TouchableOpacity onPress={() => { setType(TYPE.ORDER_RETURN) }}>
                            <Text style={styles.textButton}>Đơn trả hàng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={type == 'paySlipOrder' ? styles.bgButton : styles.bgButton1}>
                        <TouchableOpacity onPress={() => { setType(TYPE.PAY_SHIP_ORDER) }}>
                            <Text style={styles.textButton}>Phiếu trả hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.boxFifter,{alignItems: 'stretch'}]}>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                             icon={<Ionicons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
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
                <View style={[styles.boxTitle]}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>
                        Tổng số
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen, fontSize: responsiveFontSize(2) }]}>
                        {type == 'orderReturn' ? orderReturnsList.length : paySlipOrders.length}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                {type == 'orderReturn' ?
                  <FlatList
                  style={{ flex: 1, width: '100%' }}
                  data={orderReturnsList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item , index}) => {
                      return (
                        <Swipeable renderRightActions={() => renderRightActions(item.id,)} >
                            <View style={styles.container1}>
                                <TouchableOpacity onPress={() => { navigation.push('DetailOrderReturnScreen', { id: item.id }) }}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <View style={styles.box1}>
                                            <Image source={require('../../assets/imageOrderReturn.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                        </View>
                                        <View style={styles.box2}>
                                            <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.2) }]}>TH{generateFourDigitCode(index+1)}</Text>
                                            <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(2) }]}>{item.group}</Text>
                                        </View>
                                        <View style={styles.box3}>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>{shortenOrderID(item.orderID)}</Text>
                                                <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(1.7) }]}>{item.status}</Text>
                                            </View>
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
                /> :   <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={paySlipOrders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item , index}) => {
                        return (
                          <Swipeable renderRightActions={() => renderRightActions(item.id,)} >
                              <View style={styles.container1}>
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
                          </Swipeable>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                    }}
                  />}

            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddOrderReturnScreen') }}>
                    <IconIcons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
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
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
    },
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
    boxFifter: {
        paddingTop: responsiveHeight(1),
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        paddingBottom: responsiveHeight(1),
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
    content: {
        height: '94%'
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
    }
})
export default ExportProductScreen;
