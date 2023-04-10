import React, { useState } from "react";
import { COLORS } from '../constants/common';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
const ItemOrder = (props) => {
    function stringStatus(status) {
        if (status == 1) {
            return 'Đã hoàn thành';
        } else if (status == 2) {
            return 'Chưa hoàn thành'
        }
        else if (status == 3) {
            return 'Đã hủy'
        }
    }
    return (
        <TouchableOpacity style={styles.itemOrder} onPress={() => { props.navigation.navigate('OrderDetail', { order: props.item }) }}>
            <View style={styles.imageView}>
                <Image source={{ uri: 'https://i.imgur.com/SI8fnq8.png' }} style={{ width: '100%', height: '80%' }} />
            </View>
            <View style={styles.information}>
                <Text style={styles.text}>ID: {props.item.id}</Text>
                <Text style={styles.text}>Bàn: {props.item.idTable}</Text>
                <Text style={styles.text}>Số lượng người: {props.item.memberNumber}</Text>
                <Text style={styles.text}>Thời gian: {props.item.time}</Text>
                <Text style={[styles.text, { color: 'green' }]}>Trạng thái: {stringStatus(props.item.status)}</Text>
            </View>
            <View style={styles.groupButton}>
                <TouchableOpacity style={[styles.buttonItem, { backgroundColor: '#fc2003' }]}>
                    <Text style={{ color: COLORS.color_white }}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonItem, { backgroundColor: '#097ebd' }]}>
                    <Text style={{ color: COLORS.color_white }}>Liên hệ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonItem, { backgroundColor: '#04c70e' }]}>
                    <Text style={{ color: COLORS.color_white }}>Đặt lại</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({

    itemOrder: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.color_white,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        height: height / 7,
        borderRadius: 10,
        elevation: 1,
    },
    information: {
        width: '60%',
        margin: 4,
    },
    text: {
        color: COLORS.color_black,
        padding: 1,
        fontSize: 13,
    },
    imageView: {
        width: '15%',
        marginLeft: 10,
        marginRight: 10,
    },
    groupButton: {
        marginRight: 10,
        width: '18%',
        flexDirection: 'column'
    },
    buttonItem: {
        backgroundColor: 'red',
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'center',
        borderRadius: 10,
        padding: 2,
    }

})
export default ItemOrder;