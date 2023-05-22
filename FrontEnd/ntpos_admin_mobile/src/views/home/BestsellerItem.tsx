import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import homeStore from '../../store/HomeStore';

const BestsellerItem = () => {
    homeStore.updateNameProductBestseller();
    return (
        <View style={styles.inventory}>
            <View style={styles.boxTitle}>
                <Text style={styles.title}>Hàng bán chạy nhất</Text>
                <TouchableOpacity onPress={() => { homeStore.updateInventory() }}>
                    <Text>Cập nhật</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box1}>
                <View style={styles.itemBox1}>
                    <Text style={styles.text}>Sản phẩm : {homeStore.name_product_bestseller}</Text>
                    <Text style={styles.text}>Số lượng : {homeStore.number_product_bestseller}</Text>
                </View>
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        alignItems: 'center'
    },
    inventory: {
        marginTop: 10,
        backgroundColor: COLORS.color_white,
        marginBottom: 5,
        elevation: 1,
        marginLeft: 1,
        marginRight: 1,

    },
    box1: {
        justifyContent: 'center',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        backgroundColor: COLORS.color_white,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: -(10 / 2),
        marginHorizontal: -(10 / 2),
        marginBottom: 10,
    },
    title: {
        fontSize: responsiveFontSize(3),
        elevation: 1,
        color: COLORS.color_black,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    itemBox1: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 2,
        backgroundColor: '#ccffe690',
        height: responsiveHeight(12),
        width: responsiveWidth(50 - 3),
    },
    text: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: COLORS.color_black
    },
    revenue: {
        marginTop: 10,
        backgroundColor: COLORS.color_white,
        marginBottom: 5,
        elevation: 1,
        marginLeft: 1,
        marginRight: 1,
    },
})
export default BestsellerItem;
