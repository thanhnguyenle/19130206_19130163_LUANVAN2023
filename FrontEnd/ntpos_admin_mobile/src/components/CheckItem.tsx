import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View, Image, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';
interface Product {
    idProduct: string;
    name: string;
    inventoryNumber: number;
    newInventoryNumber: number;
}
interface CheckItemProps {
    product: Product;
    onPress: () => void;
    containerStyle?: ViewStyle;
}
const CheckItemComponent: React.FC<CheckItemProps> = ({ product, onPress, containerStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{product.name}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{product.idProduct}</Text>
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(2) }}>{product.inventoryNumber}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(2) }}>{product.newInventoryNumber}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(2) }}>{product.newInventoryNumber - product.inventoryNumber}</Text>
                </View>
            </View>
        </TouchableOpacity >
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
        width: '50%',
    },
    box2: {
        width: '22%',
    },
    box3: {
        width: '16%',
    },
    box4: {
        width: '22%',
    }
});

export default CheckItemComponent;
