import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import IconIcons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/AntDesign'
import { BottomSheet, ProductItemComponent, RadioButtonCom } from '../../components/index'
import { FlatList, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteProduct, deleteProductNull, fetchProductsStart } from '../../redux_store/product/productSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Product } from '../../models/product';
import { setTime } from '../../redux_store/product/fifterProductSlice';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Toast from 'react-native-toast-message';
import LoadingScreen, { loaderRef, showLoader, hideLoader } from "../../components/LoadingScreen";
const ProductSreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.product.productsSevice.loading);
    const error = useSelector((state: RootState) => state.product.productsSevice.error);
    const products = useSelector((state: RootState) => state.product.productsSevice.products);
    const deleteSucess = useSelector((state: RootState) => state.product.productsSevice.deleteSucess);
    const [locThoiGia, setLocThoiGian] = useState('toanthoigia');
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
    const handleDateChange = (value: any) => {
        setLocThoiGian(value);
        processSelectedDate(value);
    };
    const processSelectedDate = (date: any) => {
        // Xử lý giá trị ngày được chọn
        switch (date) {
            case 'homnay':
                dispatch(setTime('TODAY'))
                break;
            case 'homqua':
                dispatch(setTime('YESTERDAY'))
                break;
            case 'toanthoigia':
                dispatch(setTime('ALL_TIME'))
                break;
            case 'tuannnay':
                dispatch(setTime('THIS_WEEK'))
                break;
            case 'tuantruoc':
                dispatch(setTime('LAST_WEEK'))
                break;
            case 'thangnay':
                dispatch(setTime('THIS_MONTH'))
                break;
            case 'thangtruoc':
                dispatch(setTime('LAST_MONTH'))
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        dispatch(fetchProductsStart());
        dispatch(deleteProductNull());
    }, [dispatch]);
    function totalQuality(listProducts: Product[]) {
        let total = 0;
        for (let i = 0; i < listProducts.length; i++) {
            total += parseInt(listProducts[i].quantity);
        }
        return total;
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
                                await dispatch(deleteProduct(id)); // Gọi action để xóa
                                showLoader();
                                setTimeout(() => {
                                    hideLoader();
                                    Toast.show({
                                        type: 'success',// success, error, info, or any
                                        text1: 'Xóa thành công 👋',
                                        position: 'top',
                                    });
                                    dispatch(deleteProductNull());
                                    dispatch(fetchProductsStart());
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
            <View style={styles.boxTitle}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { color: COLORS.darkGreen }]}>{products.length}</Text>
                    <Text style={[styles.text, {}]}>hàng hóa</Text>
                    <Text style={[styles.text, {}]}>-</Text>
                    <Text style={[styles.text, {}]}>Tổng tồn</Text>
                    <Text style={[styles.text, { color: COLORS.darkGreen }]}>{' ' + totalQuality(products)}</Text>
                </View>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                    icon={<Ionicons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
                    height={460}
                    content={
                        <RadioButton.Group onValueChange={handleDateChange} value={locThoiGia}>
                            <RadioButtonCom title='Toàn thời gian' value='toanthoigia' />
                            <RadioButtonCom title='Hôm nay' value='homnay' />
                            <RadioButtonCom title='Hôm qua' value='homqua' />
                            <RadioButtonCom title='Tuần này' value='tuannnay' />
                            <RadioButtonCom title='Tuần trước' value='tuantruoc' />
                            <RadioButtonCom title='Tháng này' value='thangnay' />
                            <RadioButtonCom title='Tháng trước' value='thangtruoc' />
                        </RadioButton.Group>
                    } />
            </View>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <FlatList
                    style={{ flex: 1, width: '100%' }}
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Swipeable renderRightActions={() => renderRightActions(item.id)} >
                                <View style={styles.container1}>
                                    <TouchableOpacity onPress={() => { navigation.push('DetailProdcuct', { id: item.id }) }}>
                                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                            <View style={styles.box1}>
                                                {
                                                    item.images.length > 0 ?
                                                        <Image source={{ uri: item.images[0].url }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                                        : <Image source={require('../../assets/imageDefauProduct.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                                }
                                            </View>
                                            <View style={styles.box2}>
                                                <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{item.name}</Text>
                                            </View>
                                            <View style={styles.box3}>
                                                <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{item.price}</Text>
                                                <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{item.quantity}</Text>
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
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.replace('AddProdcuct') }}>
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
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(2),
        marginLeft: 4,
        marginRight: 4,
        color: '#00000090'
    },
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.color_white,
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.color_grey_seconds
    }, itemText: {
        fontSize: responsiveFontSize(2)
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
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
export default ProductSreen;
