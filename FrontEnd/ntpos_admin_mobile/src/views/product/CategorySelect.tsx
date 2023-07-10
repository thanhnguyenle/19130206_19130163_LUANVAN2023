import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Category } from '../../models/category';
import { deselectCategory, dispatchCategorysNull, requestListCategory, selectCategorys } from '../../redux_store/product/categorySlice';

const CategorySelectScreen = ({ route, navigation }: any) => {
    const categories = route.params && route.params.categories ? route.params.categories : [];
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.product.categorysSevice.loading);
    const error = useSelector((state: RootState) => state.product.categorysSevice.error);
    const categorys = useSelector((state: RootState) => state.product.categorysSevice.categorys);
    const selectedCategorys = useSelector((state: RootState) => state.product.categorysSevice.selectedCategorys);
    useEffect(() => {
        dispatch(requestListCategory());
        dispatch(dispatchCategorysNull());
    }, [dispatch]);
    const handleToggleRole = (categoryUser: Category) => {
        if (selectedCategorys.includes(categoryUser)) {
            dispatch(deselectCategory(categoryUser));
        } else {
            dispatch(selectCategorys(categoryUser));
        }
    };
    const checkValue = (categoryUser: Category) => {
        if (selectedCategorys.includes(categoryUser)) {
            return true;
        } else {
            return false;
        }
    };
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return <Text>Lỗi: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.listCategory}>
                <Text style={{ backgroundColor: COLORS.color_white, fontSize: responsiveFontSize(2), paddingLeft: 10, paddingEnd: 10, paddingTop: 10, }}>Sản phẩm thuộc nhóm</Text>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                containerStyle={styles.checkbox}
                                textStyle={styles.checkboxLabel}
                                checkedColor="green"
                                checked={true}
                                onPress={() => { }}
                            />
                            <TouchableOpacity>
                                <Text style={styles.checkboxLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )} />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Text style={{
                        borderEndWidth: 1,
                        height: 1,
                        backgroundColor: COLORS.color_grey_seconds,
                        width: '80%',

                    }}>
                    </Text>
                </View>
                <Text style={{ backgroundColor: COLORS.color_white, fontSize: responsiveFontSize(2), paddingLeft: 10, paddingEnd: 10, paddingTop: 10, }}>Danh sách nhóm hàng</Text>
                <FlatList
                    data={categorys}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                containerStyle={styles.checkbox}
                                textStyle={styles.checkboxLabel}
                                checkedColor="green"
                                checked={checkValue(item)}
                                onPress={() => handleToggleRole(item)}
                            />
                            <TouchableOpacity>
                                <Text style={styles.checkboxLabel}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )} />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddGroup') }}>
                    <Ionicons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 2,
        backgroundColor: COLORS.color_white,
    },
    checkbox: {
        padding: 8,
        backgroundColor: 'transparent',
    },
    checkboxLabel: {
        fontSize: responsiveFontSize(2.2),
        color: COLORS.color_black,
    },
    boxSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        textAlign: 'center',
        margin: 4,
        borderRadius: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderStartWidth: 0.5,
        borderEndWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        // backgroundColor: COLORS.color_white,
    },
    listCategory: {
    }
});
export default CategorySelectScreen;