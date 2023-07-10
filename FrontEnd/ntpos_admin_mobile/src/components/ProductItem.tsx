import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View, Image } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';
import { Product } from '../models/product';
interface ProductItemProps {
    product: Product;
    showPrice: string;
    onPress: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}
const ProductItemComponent: React.FC<ProductItemProps> = ({ product, onPress, containerStyle, showPrice }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    {
                        product.images.length > 0 ?
                            <Image source={{ uri: product.images[0] }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                            : <Image source={require('../assets/imageDefauProduct.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                    }
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{product.name}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{product.id}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.4) }}>{showPrice == 'giaban' ? product.price : product.price}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{product.quantity}</Text>
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
        width: responsiveWidth(20),
        height: responsiveWidth(20),
    },
    box2: {
        width: responsiveWidth(40),
    },
    box3: {
        width: responsiveWidth(20),
    }
});

export default ProductItemComponent;
