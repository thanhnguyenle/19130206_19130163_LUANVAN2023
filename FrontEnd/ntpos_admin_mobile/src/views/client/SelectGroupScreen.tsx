import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, RadioButtonCom } from '../../components';
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { GroupUser, deselectGroup, dispatchGroupsNull, requestList, selectGroups } from '../../redux_store/client/group/groupSlice';
import { FlatList } from 'react-native-gesture-handler';
import { Group } from '../../models/group';
const SelectGroupScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.client.groups.loading);
    const error = useSelector((state: RootState) => state.client.groups.error);
    const groups = useSelector((state: RootState) => state.client.groups.groups);
    const selectedGroups = useSelector((state: RootState) => state.client.groups.selectedGroups);
    useEffect(() => {
        dispatch(dispatchGroupsNull());
        dispatch(requestList());
    }, [dispatch]);
    const handleToggleRole = (groupUser: Group) => {
        if (selectedGroups.includes(groupUser)) {
            dispatch(deselectGroup(groupUser));
        } else {
            dispatch(selectGroups(groupUser));
        }
    };
    const checkValue = (groupUser: Group) => {
        if (selectedGroups.includes(groupUser)) {
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
                    data={groups}
                    keyExtractor={(item) => item.name}
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
export default SelectGroupScreen;