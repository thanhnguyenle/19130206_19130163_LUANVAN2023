import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth, } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/common';
import { BillComponent, BottomSheet, CheckSheetComponent, RadioButtonCom } from '../../components';
import { RadioButton } from 'react-native-paper';
import { FlatList, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setTime } from '../../redux_store/client/filterSlice';
import Icon from 'react-native-vector-icons/AntDesign'
import { deleteOrderNull, fetchOrdersStart } from '../../redux_store/orders/ordersSilce';
const BillScreen = ({ navigation }: any) => {
    const [locThoiGia, setLocThoiGian] = useState('homnay');
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.order.orderSevice.loading);
    const error = useSelector((state: RootState) => state.order.orderSevice.error);
    const orders = useSelector((state: RootState) => state.order.orderSevice.orders);
    const deleteSucess = useSelector((state: RootState) => state.order.orderSevice.deleteSucess);
    useEffect(() => {
        dispatch(fetchOrdersStart());
        dispatch(deleteOrderNull());
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
            // Alert.alert(
            //     'Cảnh báo',
            //     'Bạn có muốn xóa sản phẩm này không?',
            //     [
            //         { text: 'Cancel', style: 'cancel' },
            //         {
            //             text: 'OK', onPress: () => {
            //                 dispatch(deleteProduct(id))
            //                 if (deleteSucess == true) {
            //                     dispatch(setTime('ALL_TIME'));
            //                     dispatch(deleteProductNull());
            //                 } else {
            //                     Alert.alert(
            //                         'Thông báo',
            //                         'Bạn xóa sản phẩm không thành công?',
            //                     )
            //                 }
            //             }
            //         }
            //     ]);
        }}>
            <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
        </TouchableOpacity>
    );
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return <Text>Lỗi: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxFifter}>
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
                <View style={styles.boxTitle}>
                    <Text style={styles.text}>
                        Tổng số hóa đơn
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen }]}>
                        6
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Swipeable renderRightActions={() => renderRightActions(item.id)} >
                                <BillComponent billItem={item} key={item.id} />
                            </Swipeable>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                    }}
                />
            </View>
            {/* <View>
               
            </View> */}
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
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
        padding: 10,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04d4f',
    }
})
export default BillScreen;