import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import homeStore from '../../store/HomeStore';

const OverviewItem = (props: any) => {
    homeStore.updateOverview();
    return (
        <View style={styles.overview}>
            <View style={styles.boxTitle}>
                <Text style={styles.title}>Tổng quan</Text>
                <TouchableOpacity onPress={() => { homeStore.updateOverview() }}>
                    <Text>Cập nhật</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                props.navigation.push('Overview');
            }}>
                <View style={styles.box1}>
                    <View style={styles.itemBox1}>
                        <Text style={styles.text}>{homeStore.numberOrder} Hóa đơn</Text>
                    </View>
                    <View style={[styles.itemBox1, { backgroundColor: '#e6ff9950' }]}>
                        <Text style={styles.text}>{homeStore.numberPaySlip} Phiếu trả</Text>
                    </View>
                    <View style={[styles.itemBox1, { backgroundColor: '#e6ccff50' }]}>
                        <Text style={styles.text}>{homeStore.numberUsing} Bàn sử dụng</Text>
                    </View>
                    <View style={[styles.itemBox1, { backgroundColor: '#ccffff50' }]}>
                        <Text style={styles.text}> {homeStore.numberClient} Khách đang có</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View >

    );
};
const styles = StyleSheet.create({
    overview: {
        marginTop: 10,
        backgroundColor: COLORS.color_white,
        marginBottom: 5,
        elevation: 1,
        marginLeft: 1,
        marginRight: 1,
    },

    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        alignItems: 'center'
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 2,
        backgroundColor: '#99ccff40',
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
export default OverviewItem;
