import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View, Image, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';
interface BillComponentProps {
    billItem: Order;
}

function calculateTotalPrice(orderLineItems: OrderLineItem[]): number {
    let totalPrice = 0;

    for (const orderLineItem of orderLineItems) {
        totalPrice += orderLineItem.price;
    }

    return totalPrice;
}
const BillComponent: React.FC<BillComponentProps> = ({ billItem }) => {
    
    const totalPrice = calculateTotalPrice(billItem.orderLineItems);
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => { }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    <Image source={require('../assets/bill.png')} style={{ flex: 1, resizeMode: 'stretch', width: '100%', height: '100%', borderRadius: 10 }} />
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.darkGreen, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>{totalPrice}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{billItem.group}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{billItem.orderDate}</Text>
                    <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(1.9) }}>{billItem.status}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{billItem.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
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
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        alignItems: 'center'
    },
    box2: {
        width: responsiveWidth(38),
    },
    box3: {
        width: responsiveWidth(38),
    }
});

export default BillComponent;
