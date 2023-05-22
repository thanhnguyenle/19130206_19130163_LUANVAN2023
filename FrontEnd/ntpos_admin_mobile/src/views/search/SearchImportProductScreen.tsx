import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/common';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonCheck } from '../../components';
const SearchImportProductScreen = () => {
    const [phieu_tam, setPhieuTam] = useState(true);
    const [da_nhap_hang, setDaNhapHang] = useState(true);
    const [da_huy, setDaHuy] = useState(true);
    return (
        <View>
            <ScrollView>
                <Text style={styles.text}>Tìm theo</Text>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={25} />
                    </TouchableOpacity>
                    <TextInput placeholder='Mã phiếu nhập' style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}></TextInput>
                </View>
                <Text style={styles.text}>Trạng thái</Text>
                <View style={styles.boxTypeCheck}>
                    <ButtonCheck title='Phiếu tạm' isChecked={phieu_tam} onPress={() => {
                        setPhieuTam(!phieu_tam);
                    }} />
                    <ButtonCheck title='Đã nhập hàng' isChecked={da_nhap_hang} onPress={() => {
                        setDaNhapHang(!da_nhap_hang);
                    }} />
                    <ButtonCheck title='Đã hủy' isChecked={da_huy} onPress={() => {
                        setDaHuy(!da_huy);
                    }} />
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: responsiveFontSize(2.1),
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        color: COLORS.color_grey,
    },
    boxSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        textAlign: 'center',
        margin: 4,
        borderRadius: 40,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderStartWidth: 0.5,
        borderEndWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        backgroundColor: COLORS.color_white,
    },
    boxTypeCheck: {
        flexDirection: 'row',
        marginTop: 4,
        marginLeft: 2,
        backgroundColor: COLORS.color_white,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
})
export default SearchImportProductScreen;