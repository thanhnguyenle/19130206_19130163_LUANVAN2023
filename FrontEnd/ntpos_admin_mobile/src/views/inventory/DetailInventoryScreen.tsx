import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { CheckItemComponent } from "../../components";
const DetailInventoryScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text>
                    <Text style={styles.textGrey}>Người cân bằng: </Text>
                    <Text style={styles.textBlack}>NguyenLeThanh</Text>
                </Text>
                <Text style={styles.textTime}>15/04/2023 23:47</Text>
            </View>
            <View style={styles.box}>
                <Text>
                    <Text style={styles.textGrey}>Người tạo: </Text>
                    <Text style={styles.textBlack}>NguyenLeThanh</Text>
                </Text>
                <Text style={styles.textTime}>15/04/2023 23:47</Text>
            </View>
            <View style={styles.boxContent}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { width: '50%' }]}>Hàng kiểm</Text>
                    <Text style={[styles.text, { width: '22%' }]}>Tồn kho</Text>
                    <Text style={[styles.text, { width: '16%' }]}>Thực tế</Text>
                    <Text style={[styles.text, { width: '22%' }]}>Lệch</Text>
                </View>
                <View>
                    <CheckItemComponent
                        product={{ idProduct: 'SP0001', name: 'Bia 333', inventoryNumber: 898, newInventoryNumber: 89 }}
                        onPress={() => { }} />
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textGrey: {
        padding: 1,
        color: COLORS.color_grey,
        fontSize: responsiveFontSize(2),
    },
    textBlack: {
        padding: 1,
        color: COLORS.color_black,
        fontSize: responsiveFontSize(2.2),
        fontWeight: '500'
    },
    textTime: {
        paddingTop: 4,
        fontSize: responsiveFontSize(1.9),
        color: COLORS.color_grey
    },
    text: {
        color: COLORS.color_black
    },
    box: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: COLORS.color_white,
        borderBottomWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,

    },
    boxContent: {
        backgroundColor: COLORS.color_white,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
});
export default DetailInventoryScreen;