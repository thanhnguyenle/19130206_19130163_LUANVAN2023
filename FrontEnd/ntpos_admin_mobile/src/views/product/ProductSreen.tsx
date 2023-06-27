import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import IconIcons from 'react-native-vector-icons/Ionicons'
import { BottomSheet, ProductItemComponent, RadioButtonCom } from '../../components/index'
import { FlatList } from 'react-native-gesture-handler';
import { products } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchProductsStart } from '../../redux_store/product/productSlice';
const ProductSreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.product.products.loading);
    const error = useSelector((state: RootState) => state.product.products.error);
    const products = useSelector((state: RootState) => state.product.products.products);
    const [locGia, setLocGia] = useState('giaban');
    const renderItem = ({ item }: any) => (
        <ProductItemComponent
            product={item}
            showPrice={locGia}
            onPress={() => {
                navigation.push('DetailProdcuct', { itemId: item.id })
            }} />
    );
    useEffect(() => {
        dispatch(fetchProductsStart());
    }, [dispatch]);

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
                    <Text style={[styles.text, { color: COLORS.darkGreen }]}>25</Text>
                    <Text style={[styles.text, {}]}>hàng hóa</Text>
                    <Text style={[styles.text, {}]}>-</Text>
                    <Text style={[styles.text, {}]}>Tổng tồn</Text>
                    <Text style={[styles.text, { color: COLORS.darkGreen }]}>25</Text>
                </View>
                <BottomSheet fontSize={responsiveFontSize(2)} icon={''} title={locGia == 'giaban' ? 'Giá bán' : 'Giá vốn'} height={responsiveHeight(21)} content={
                    <RadioButton.Group onValueChange={newLocGia => setLocGia(newLocGia)} value={locGia}>
                        <RadioButtonCom title='Giá bán' value='giaban' />
                        <RadioButtonCom title='Giá vốn' value='giavon' />
                    </RadioButton.Group>
                } />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                    (
                        <TouchableOpacity style={styles.container1} onPress={() => { navigation.push('DetailProdcuct', { id: item.id }) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={styles.box1}>
                                    {
                                        item.images.length > 0 ?
                                            <Image source={{ uri: item.images[0].url + '' }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                            : <Image source={require('../../assets/imageDefauProduct.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    }
                                </View>
                                <View style={styles.box2}>
                                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{item.name}</Text>
                                </View>
                                <View style={styles.box3}>
                                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{locGia == 'giaban' ? item.price : item.price}</Text>
                                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{item.quantity}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddProdcuct') }}>
                    <IconIcons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
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
        backgroundColor: COLORS.color_white,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
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
    }

})
export default ProductSreen;