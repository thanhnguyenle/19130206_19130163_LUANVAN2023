import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import Iconicons from 'react-native-vector-icons/Ionicons'
import { ButtonCheck } from '../../components';

const SearchInventoryScreen = () => {
    const [phieu_tam, setPhieuTam] = useState(true);
    const [da_can_bang, setDaCanBang] = useState(true);
    const [da_huy, setDaHuy] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tìm theo</Text>
            <View style={styles.boxSearch}>
                <TouchableOpacity>
                    <Iconicons name='search' color={COLORS.color_grey} size={25} />
                </TouchableOpacity>
                <TextInput placeholder='Mã phiếu hoặc tên hàng' style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}></TextInput>
            </View>
            <Text style={styles.text}>Trạng thái</Text>
            <View style={styles.boxTypeCheck}>
                <ButtonCheck title='Phiếu tạm' isChecked={phieu_tam} onPress={() => {
                    setPhieuTam(!phieu_tam);
                }} />
                <ButtonCheck title='Đã cân bằng' isChecked={da_can_bang} onPress={() => {
                    setDaCanBang(!da_can_bang);
                }} />
                <ButtonCheck title='Đã hủy' isChecked={da_huy} onPress={() => {
                    setDaHuy(!da_huy);
                }} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginTop: 10,
        marginLeft: 2,
        backgroundColor: COLORS.color_white,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
})
export default SearchInventoryScreen;