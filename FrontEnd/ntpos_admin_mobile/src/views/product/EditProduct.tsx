import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
const EditProductScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <View style={{ flexDirection: 'row' }}>
                    <ImageBackground source={{
                        uri: 'https://cdn.tgdd.vn/2021/06/CookProduct/1(1)-1200x676-1.jpg'
                    }}
                        style={{ width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white, alignItems: 'flex-end', justifyContent: 'flex-start' }}
                    >
                        <TouchableOpacity style={{ backgroundColor: '#00000030', borderRadius: 20 }}>
                            <IconIocns name='close' size={40} color={COLORS.color_white} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={{ alignItems: 'center', width: 150, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', marginLeft: 10, }}>
                        <TouchableOpacity>
                            <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <ScrollView>
                <View style={styles.boxContent}>
                    <Text style={styles.name}>Lemon Tea</Text>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhóm hàng</Text>
                        <TextInput style={styles.textContent} placeholder='Cafe...'>TEA</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Loại hàng</Text>
                        <TextInput style={styles.textContent} placeholder='Hàng hóa, Món ăn...'>Hàng hóa</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Định mức tồn</Text>
                        <TextInput style={styles.textContent} placeholder='0-1000'>0 - 1000</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Giá bán</Text>
                        <TextInput style={styles.textContent} placeholder='vnđ'>15000</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Giá vốn</Text>
                        <TextInput style={styles.textContent} placeholder='vnđ'>6000</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tồn kho</Text>
                        <TextInput style={styles.textContent} placeholder='cái, món...'>1008</TextInput>
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTitle}>Mô tả</Text>
                    <View style={styles.des}>
                        <TextInput style={styles.textDes} placeholder='chi tiết...'>Món ăn ngon</TextInput>
                    </View>
                </View>
            </ScrollView>
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
        alignItems: 'center'

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
        borderColor: COLORS.color_black,
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
export default EditProductScreen;