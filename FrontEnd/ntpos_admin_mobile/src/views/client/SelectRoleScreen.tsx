import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Role, deselectRole, dispatchRolesNull, fetchListRolesRequest, selectRole } from '../../redux_store/client/listRoleSlice';
import { FlatList } from 'react-native-gesture-handler';
const SelectRoleScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const roles = useSelector((state: RootState) => state.client.roles.roles);
    const loading = useSelector((state: RootState) => state.client.roles.loading);
    const error = useSelector((state: RootState) => state.client.roles.error);
    const selectedRoles = useSelector((state: RootState) => state.client.roles.selectedRoles);
    function getNameTitle(value: string): string {
        let valueNew = '';
        switch (value) {
            case 'edit_user':
                valueNew = 'Chỉnh sửa người dùng'
                break;
            case 'update_product':
                valueNew = 'Câp nhật sản phẩm'
                break;
            case 'delete_user':
                valueNew = 'Xóa người dùng'
                break;
            case 'edit_product':
                valueNew = 'Chỉnh sửa sản phẩm'
                break;
            case 'view_product':
                valueNew = 'Xem chi tiết sản phẩm'
                break;
            case 'view_inventory':
                valueNew = 'Xem hàng tồn kho'
                break;
            case 'update_user':
                valueNew = 'Cập nhâp người dùng'
                break;
            case 'delete_product':
                valueNew = 'Xóa hàng hóa'
                break;
            case 'view_user':
                valueNew = 'Xem chi tiết người dùng'
                break;
            case 'delete_inventory':
                valueNew = 'Xóa hàng trong tồn kho'
                break;
            default:
                break;
        }
        return valueNew;
    }
    useEffect(() => {
        dispatch(dispatchRolesNull());
        dispatch(fetchListRolesRequest());
    }, []);
    const handleToggleRole = (role: Role) => {
        if (selectedRoles.includes(role)) {
            console.log('xóa');
            dispatch(deselectRole(role));
        } else {
            console.log(selectedRoles);
            console.log('Thêm');
            dispatch(selectRole(role));
        }
    };
    const checkValue = (role: Role) => {
        if (selectedRoles.includes(role)) {
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
                <FlatList
                    data={roles}
                    keyExtractor={(item) => item.roleName}
                    renderItem={({ item }) => (
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                containerStyle={styles.checkbox}
                                textStyle={styles.checkboxLabel}
                                checkedColor="green"
                                checked={checkValue(item)}
                                onPress={() => handleToggleRole(item)}
                            />
                            <Text style={styles.checkboxLabel}>{getNameTitle(item.roleName)}</Text>
                        </View>
                    )} />
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
        backgroundColor: COLORS.color_white,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        padding: 8,
        backgroundColor: 'transparent',
    },
    checkboxLabel: {
        fontSize: responsiveFontSize(2.2),
    },
});
export default SelectRoleScreen;