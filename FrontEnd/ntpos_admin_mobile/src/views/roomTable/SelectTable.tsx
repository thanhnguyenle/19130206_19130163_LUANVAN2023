import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { FlatList } from 'react-native-gesture-handler';
import { deselectTable, dispatchTablesNull, selectTables } from '../../redux_store/table/groupTableSlice';
import { fetchDataTableIsAreaRequest, fetchTablesStart } from "../../redux_store/table/tableSlice";
import { Table } from '../../models/table';
const SelectTableScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.table.tableSevice.loading);
    const error = useSelector((state: RootState) => state.table.tableSevice.error);
    const data = useSelector((state: RootState) => state.table.tableSevice.dataTableIsArea);
    const selectedTables = useSelector((state: RootState) => state.table.groupTablesSevice.selectedTables);
    useEffect(() => {
        dispatch(fetchDataTableIsAreaRequest());
        dispatch(dispatchTablesNull());
    }, [dispatch]);
    const handleToggleRole = (table: Table) => {
        if (selectedTables.includes(table)) {
            dispatch(deselectTable(table));
        } else {
            dispatch(selectTables(table));
        }
    };
    const checkValue = (table: Table) => {
        if (selectedTables.includes(table)) {
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
                    data={data}
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
export default SelectTableScreen;
