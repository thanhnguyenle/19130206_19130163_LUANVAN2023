import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { COLORS } from '../constants/common';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {Product} from "../model/product";
import {requestListCategory} from "../redux/product/category/CategorySlice";
import {fetchProductsStart} from "../redux/product/product1/ProductSlice";
import {useDispatch} from "react-redux";

interface ProductItemProps {
    navigation: any;
    item: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ navigation, item }) => {
    return (
        <View style={styles.productContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.push('DetailProductScreen', { id: item.id });
                }}
            >
                <View style={styles.containerImage}>
                    {
                        item.images.length > 0 ? <Image style={styles.image} source={{uri: item.images[0].url}} /> : <Image style={styles.image} source={{ uri: item.images[0].url }} />
                    }
                </View>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.star}>
                    <Iconicons name="star" style={styles.iconStar} />
                    <Text style={{ color: 'grey' }}>4.2</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    productContainer: {
        backgroundColor: 'white',
        width: width / 2.4 - 10,
        padding: 10,
        height: height / 4,
        margin: 10,
        elevation: 1,
        borderRadius: 8,
    },
    containerImage: {
        height: '70%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: COLORS.color_black,
        fontSize: 16,
        marginTop: 5,
        fontWeight: '600',
        margin: 2,
    },
    star: {
        width: '22%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconStar: {
        color: COLORS.color_star,
        fontSize: 12,
        alignItems: 'flex-end',
    },
});

export default ProductItem;
