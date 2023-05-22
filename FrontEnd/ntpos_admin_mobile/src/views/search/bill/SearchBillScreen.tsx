import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../../constants/common';
import Iconicons from 'react-native-vector-icons/Ionicons'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonCheck } from '../../../components';
import DateTimePicker from '@react-native-community/datetimepicker';

const SearchBillScreen = ({ navigation }: any) => {
    const [co_giao_hang, setCoGiaoHang] = useState(true);
    const [khong_giao_hang, setKhGiaoHang] = useState(true);
    const [hoan_thanh, setHoanThanh] = useState(true);
    const [da_huy, setDaHuy] = useState(false);
    const [dang_xu_ly, setDangXuLy] = useState(true);
    const [tien_mat, setTienMat] = useState(true);
    const [the, setThe] = useState(false);
    const [chuyen_khoan, setChuyenKhoan] = useState(true);
    //datetime
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState();
    const [dateTime, setDateTime] = useState('Lựa chọn ngày')
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        let tempDate = new Date(currentDate);
        let fDate = ((tempDate.getDate()) + '/' + (tempDate.getMonth() + 1) + '/' + (tempDate.getFullYear()));
        setDateTime(fDate)
    }
    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Tìm theo</Text>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Iconicons name='search' color={COLORS.color_grey} size={25} />
                    </TouchableOpacity>
                    <TextInput placeholder='Mã hóa đơn' style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}></TextInput>
                </View>
                <Text style={styles.text}>Giao hàng</Text>
                <View style={styles.boxTypeCheck}>
                    <ButtonCheck title='Có giao hàng' isChecked={co_giao_hang} onPress={() => {
                        setCoGiaoHang(!co_giao_hang);
                    }} />
                    <ButtonCheck title='Không giao hàng' isChecked={khong_giao_hang} onPress={() => {
                        setKhGiaoHang(!khong_giao_hang);
                    }} />
                </View>
                <Text style={styles.text}>Trạng thái</Text>
                <View style={styles.boxTypeCheck}>
                    <ButtonCheck title='Hoàn thành' isChecked={hoan_thanh} onPress={() => {
                        setHoanThanh(!hoan_thanh);
                    }} />
                    <ButtonCheck title='Đã hủy' isChecked={da_huy} onPress={() => {
                        setDaHuy(!da_huy);
                    }} />
                    <ButtonCheck title='Đang xử lý' isChecked={dang_xu_ly} onPress={() => {
                        setDangXuLy(!dang_xu_ly);
                    }} />
                </View>
                <Text style={styles.text}>Phương thức thanh toán</Text>
                <View style={styles.boxTypeCheck}>
                    <ButtonCheck title='Tiền mặt' isChecked={tien_mat} onPress={() => {
                        setTienMat(!tien_mat);
                    }} />
                    <ButtonCheck title='Thẻ' isChecked={the} onPress={() => {
                        setThe(!the);
                    }} />
                    <ButtonCheck title='Chuyển khoản' isChecked={chuyen_khoan} onPress={() => {
                        setChuyenKhoan(!chuyen_khoan);
                    }} />
                </View>
                <Text style={styles.text}>Thời gian giao hàng</Text>
                <View style={styles.boxTypeCheck}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                        <TouchableOpacity onPress={() => showMode('date')} style={{ width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Iconicons name='calendar-outline' size={22} color={COLORS.color_grey} />
                                <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2) }]}>{dateTime}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showMode('date')} style={{ width: '100%' }}>
                            <Iconicons name='chevron-forward-sharp' size={22} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        minimumDate={date}
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
                <Text style={styles.text}>Phòng bàn</Text>
                <View style={styles.boxTypeCheck}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
                        <TouchableOpacity onPress={() => { navigation.push('DetailSelectTyleTable') }} style={{ width: '100%' }}>
                            <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2) }]}>Tất cả</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.push('DetailSelectTyleTable') }} style={{ width: '100%' }}>
                            <Iconicons name='chevron-forward-sharp' size={22} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
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
export default SearchBillScreen;