import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import IconIcons from 'react-native-vector-icons/Ionicons'
import { BottomSheet, ProductItemComponent, RadioButtonCom } from '../../components/index'
import { FlatList } from 'react-native-gesture-handler';
import { products } from './data';
const ProductSreen = ({ navigation }: any) => {
    const [locGia, setLocGia] = useState('giaban');
    const renderItem = ({ item }: any) => (
        <ProductItemComponent
            product={item}
            showPrice={locGia}
            onPress={() => {
                navigation.push('DetailProdcuct', { itemId: item.idProduct })
            }} />
    );
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
                    renderItem={renderItem}
                    keyExtractor={item => item.idProduct}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddProdcuct') }}>
                    <IconIcons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
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
    }

})
export default ProductSreen;