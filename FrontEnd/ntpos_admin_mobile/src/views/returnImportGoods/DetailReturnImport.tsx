import React from "react";
import { View, Text, StyleSheet, ScrollViewBase, SafeAreaView } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native-gesture-handler";
import { products } from "../product/data";
const DetailReturnImport = ({ navigation }: any) => {
    const listItems = products.map((item) =>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: COLORS.color_white,
            paddingTop: 10,
            paddingBottom: 10,
        }} key={item.idProduct}>
            <View>
                <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>{item.name}</Text>
                <Text style={styles.text}>{item.idProduct}</Text>
                <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(1.8) }]}>
                    <Text>
                        {item.price}
                    </Text>
                    <Text style={[styles.text, { color: COLORS.darkGreen, fontSize: responsiveFontSize(1.4) }]}>
                        x{item.numberInventory}
                    </Text>
                </Text>
                {/* nhan cho so luong */}
            </View>
            <View>
                <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>{item.price}</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <ScrollView
                style={{ flexGrow: 1 }}
                scrollEnabled={true}>
                <View style={styles.box}>
                    <View style={styles.left}>
                        <FontAwesome name="users" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={[styles.text, { color: COLORS.color_black }]}>Đại lý Hồng Phúc</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.text}>Hương - Kế toán</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.left}>
                        <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={styles.text}>25/04/2023 - 25/04/2023</Text>
                    </View>
                </View>
                <View style={styles.boxListFood}>
                    {listItems}
                </View>
                <View style={styles.boxListFood}>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền hàng</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>480000</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Giảm giá phiếu nhập</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>0</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Cần trả NCC</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>480000</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Đã trả NCC</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>480000</Text>
                    </View>
                </View>
            </ScrollView >
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
    boxListFood: {
        marginTop: 10,
    },
    right: {
    }
});
export default DetailReturnImport;