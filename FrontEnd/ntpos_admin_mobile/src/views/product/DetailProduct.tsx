import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize } from 'react-native-responsive-dimensions'


const DetailProductScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <ImageBackground source={{
                    uri: 'https://cdn.tgdd.vn/2021/06/CookProduct/1(1)-1200x676-1.jpg'
                }}
                    style={{ width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white }}
                />
            </View>
            <View style={styles.boxContent}>
                <Text style={styles.name}>Lemon Tea</Text>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Nhóm hàng</Text>
                    <Text style={styles.textContent}>TEA</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Loại hàng</Text>
                    <Text style={styles.textContent}>Hàng hóa</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Định mức tồn</Text>
                    <Text style={styles.textContent}>0 - 1000</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Giá bán</Text>
                    <Text style={styles.textContent}>15000</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Giá vốn</Text>
                    <Text style={styles.textContent}>6000</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Tồn kho</Text>
                    <Text style={styles.textContent}>1008</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.textTitle}>Mô tả</Text>
                <View style={styles.des}>
                    <Text style={styles.textDes}></Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
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
        alignItems: 'center',
    },
    textTitle: {
        width: '30%',
        fontSize: responsiveFontSize(2.1),
        color: COLORS.color_grey
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
    des: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    }
});
export default DetailProductScreen;