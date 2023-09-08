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
import {
  deselectSelectedOrders,
  dispatchSelectedOrdersNull,
  fetchOrdersStart,
  selectSelectedOrders
} from "../../redux_store/orders/ordersSilce";
import { Order } from "../../models/order";
const SelectOrderIDScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.order.orderSevice.loading);
  const error = useSelector((state: RootState) => state.order.orderSevice.error);
  const orders = useSelector((state: RootState) => state.order.orderSevice.orders);
  const selectedOrders = useSelector((state: RootState) => state.order.orderSevice.selectedOrder);
  useEffect(() => {
    dispatch(fetchOrdersStart());
    dispatch(dispatchSelectedOrdersNull());
  }, [dispatch]);
  const handleToggleRole = (order: Order) => {
    if (selectedOrders.includes(order)) {
      dispatch(deselectSelectedOrders(order));
    } else {
      dispatch(selectSelectedOrders(order));
    }
  };
  const checkValue = (order: Order) => {
    if (selectedOrders.includes(order)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listCategory}>
        <FlatList
          data={orders}
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
                <Text style={styles.checkboxLabel}>{item.id}</Text>
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
export default SelectOrderIDScreen;
