import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    FlatList, Image,
} from 'react-native';
import { COLORS } from '../constants/common';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import { fetchProductsStart} from "../redux/product/product1/ProductSlice";
import ProductItemPrice from "../components/ProductItemPrice";

interface ListProductsProps {
    navigation: any;
    route: any;
}

const ListProductsScreen: React.FC<ListProductsProps> = ({ navigation , route}) => {
    const products = useSelector((state: RootState) => state.product.products.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductsStart());
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={{paddingBottom:5, marginLeft:10,paddingTop:10}}>Tất cả sản phẩm</Text>
                    <View style={styles.container}>
                        <View style={styles.app}>
                            {products.map((item) => (
                                <ProductItemPrice
                                    item={item}
                                    navigation={navigation}
                                    key={item.id}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    app: {
        marginHorizontal: 'auto',
        width: 400,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardView: {
        position: 'relative',
        flex: 1,
        width: width - 5,
        height: height / 2,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 0,
        shadowColor: COLORS.color_black,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: width - 5,
        height: height / 2,
        resizeMode:'contain',
        backgroundColor:COLORS.color_white
    },
    titlePanel: {
        color: COLORS.color_black,
        margin: 5,
        marginLeft: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.color_black,
    },
    titlePrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.color_primary,
    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.color_grey,
        borderRadius: 10,
        padding: 5,
        opacity: 0.8,
        margin: 10,
    },
    imageText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    groupBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    description: {
        margin: 5,
        marginLeft: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: COLORS.color_black,
    },
});

export default ListProductsScreen;
