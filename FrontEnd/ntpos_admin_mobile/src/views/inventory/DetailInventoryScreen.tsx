import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { CheckItemComponent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { detailInventoryRequest } from "../../redux_store/inventory/InventorySlice";
import { formatDateFromNumber } from "../../utils/function";
import { ScrollView } from "react-native-gesture-handler";
const DetailInventoryScreen = ({ navigation, route }: any) => {
    const { id } = route.params;
    const dispatch = useDispatch();
    const inventoryDetail = useSelector((state: RootState) => state.inventory.inventoryService.detailMaterial);
    useEffect(() => {
        dispatch(detailInventoryRequest(id));
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tên nguyên liệu</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{inventoryDetail.name}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Số lượng</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{inventoryDetail.quantity+ '. ' +inventoryDetail.unit}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Mô tả</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{inventoryDetail.description === '' ? '...' : inventoryDetail.description}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Trạng thái</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{inventoryDetail.status}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Ngày nhập</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{formatDateFromNumber(inventoryDetail.expiredDate)}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Ngày hết hạn</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{formatDateFromNumber(inventoryDetail.manufacturerDate)}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{inventoryDetail.price + ' đồng'}</Text>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: COLORS.color_white,
        borderBottomWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        justifyContent: 'space-between',
    },
    text: {
        color: COLORS.color_grey,
        fontSize: responsiveFontSize(2),
    },
    left: {
        flexDirection: 'row'
    },
    boxImage: {
      marginTop: 10,
      marginBottom: 10,
      height: '20%',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 1,
    },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
  },
});
export default DetailInventoryScreen;
