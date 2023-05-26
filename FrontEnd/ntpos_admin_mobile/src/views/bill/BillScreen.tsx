import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/common';
import { BillComponent, BottomSheet, CheckSheetComponent, RadioButtonCom } from '../../components';
import { RadioButton } from 'react-native-paper';

const BillScreen = ({ navigation }: any) => {
    const [locThoiGia, setLocThoiGian] = useState('homnay');
    function getNameTitle(value: string): string {
        let valueNew = '';
        switch (value) {
            case 'homnay':
                valueNew = 'Hôm nay'
                break;
            case 'homqua':
                valueNew = 'Hôm qua'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'tuannnay':
                valueNew = 'Tuần này'
                break;
            case 'tuantruoc':
                valueNew = 'Tuần trước'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'thangnay':
                valueNew = 'Tháng này'
                break;
            case 'thangtruoc':
                valueNew = 'Tháng trước'
                break;
            default:
                break;
        }
        return valueNew;
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxFifter}>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                    icon={<Ionicons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
                    height={460}
                    content={
                        <RadioButton.Group onValueChange={newLocThoiGia => setLocThoiGian(newLocThoiGia)} value={locThoiGia}>
                            <RadioButtonCom title='Toàn thời gian' value='toanthoigia' />
                            <RadioButtonCom title='Hôm nay' value='homnay' />
                            <RadioButtonCom title='Hôm qua' value='homqua' />
                            <RadioButtonCom title='Tuần này' value='tuannnay' />
                            <RadioButtonCom title='Tuần trước' value='tuantruoc' />
                            <RadioButtonCom title='Tháng này' value='thangnay' />
                            <RadioButtonCom title='Tháng trước' value='thangtruoc' />
                        </RadioButton.Group>
                    } />
                <View style={styles.boxTitle}>
                    <Text style={styles.text}>
                        Tổng số hóa đơn
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen }]}>
                        6
                    </Text>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Thứ 7, 15/4/2023</Text>
                <BillComponent bill={{
                    idBill: 'HD98392',
                    price: 2330989,
                    datetimeStart: 'Thứ 7,15/05/2023',
                    datetimeEnd: 'Thứ 2, 20/4/2023',
                    customer: 'Khách lẻ',
                    operation: 'Đã cân bằng kho',
                    status: 'Hoàn thành',
                    tableName: 'Bàn 1'
                }} onPress={() => {
                    navigation.push('DetailBillScreen')
                }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxFifter: {
        paddingTop: responsiveHeight(1),
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        paddingBottom: responsiveHeight(1),
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    boxTitle: {
        flexDirection: 'row',
        marginRight: responsiveWidth(5),
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_grey,
    },
    title: {
        marginBottom: responsiveHeight(1),
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(2),
    }
})
export default BillScreen;