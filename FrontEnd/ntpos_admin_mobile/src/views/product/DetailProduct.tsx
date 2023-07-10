import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Modal, Image, } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchProductRequest } from '../../redux_store/product/productSlice';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const DetailProductScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const product = useSelector((state: RootState) => state.product.productsSevice.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductRequest(id));
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <ScrollView horizontal>
                    {
                        product.images?.length > 0 ?
                            product.images.map((item, index) => (
                                <ImageBackground source={{ uri: item.url + '' }} key={index}
                                    style={[styles.content, { width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white }]} />
                            )) : null
                    }
                </ScrollView>
            </View>
            <View style={styles.boxContent}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Nhóm hàng</Text>
                    <Text style={styles.textContent}>
                        {product.categories.map((category, index) => (
                            <Text key={index}>{(product.categories.length - 1) != index ? category.name + ', ' : category.name + ' '}</Text>
                        ))}
                    </Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Giá bán</Text>
                    <Text style={styles.textContent}>{product.price}</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Tồn kho</Text>
                    <Text style={styles.textContent}>{product.quantity}</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Đơn vị</Text>
                    <Text style={styles.textContent}>{product.unit}</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Trạng thái</Text>
                    <Text style={styles.textContent}>{product.status == 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}</Text>
                </View>
            </View>
            <View style={styles.box}>
                <Text style={styles.textTitle}>Mô tả</Text>
                <View style={styles.des}>
                    <Text style={styles.textDes}>{product.description}</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginHorizontal: 10,
    },
    boxImage: {
        marginTop: 10,
        marginBottom: 10,
        height: '20%',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 1,
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