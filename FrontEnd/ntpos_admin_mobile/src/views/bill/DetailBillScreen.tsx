import React from "react";
import { View, Text, StyleSheet, ScrollViewBase, SafeAreaView } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { CheckItemComponent } from "../../components";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { products } from "../product/data";
const DetailBillScreen = ({ navigation }: any) => {
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
                <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(1.8) }]}>{item.price}</Text>
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
                        <FontAwesome name="user" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={styles.text}>Khách lẻ</Text>
                    </View>
                    <Text style={[styles.text, { fontWeight: '400', color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>NguyenLeThanh</Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.left}>
                        <FontAwesome name="tag" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={styles.text}>Bảng giá chung</Text>
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
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền phải trả</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>480000</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Giảm giá hóa đơn</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>0</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng cần trả</Text>
                        </View>
                        <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>480000</Text>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.left}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng đã trả</Text>
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
    }
});
export default DetailBillScreen;