import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View, Image, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';
import { Order, OrderLineItem } from "../models/order";
import navigation from "../reducer/navigation";
import { formatPrice, generateFourDigitCode } from "../utils/function";
interface BillComponentProps {
    billItem: Order;
    navigation : any;
    thutu:number;
}
function formatDateFromNumber(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
function calculateTotalPrice(orderLineItems: OrderLineItem[]): number {
    let totalPrice = 0;

    for (const orderLineItem of orderLineItems) {
        totalPrice += orderLineItem.price;
    }

    return totalPrice;
}
const BillComponent: React.FC<BillComponentProps> = ({ billItem,navigation ,thutu}) => {
    const formattedDate = formatDateFromNumber(billItem.orderDate);
    const totalPrice = calculateTotalPrice(billItem.orderLineItems);
    return (
        <TouchableOpacity onPress={() => { navigation.push('DetailBillScreen', {id: billItem.id}) }}>
            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={styles.box1}>
                    <Image source={require('../assets/order.png')} style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'contain' }} />
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.darkGreen, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>HD{generateFourDigitCode(thutu+1)}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{billItem.group}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.darkGreen, fontWeight: '700', fontSize: responsiveFontSize(2.1) }}>{ formatPrice(totalPrice)}</Text>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{formattedDate}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{billItem.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export default BillComponent;
