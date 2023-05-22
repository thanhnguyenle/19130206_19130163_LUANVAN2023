import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet, RadioButtonCom } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import { traDon } from '../product/data';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExportProductScreen = ({ navigation }: any) => {
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
    const listItems = traDon.map((item) =>
        <TouchableOpacity key={item.id} onPress={() => {
            navigation.push('DetailExportProduct')
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: COLORS.color_white,
                paddingTop: 10,
                paddingBottom: 10,
            }}
            >
                <View>
                    <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>{item.id}</Text>
                    <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }]}>Khách lẻ</Text>
                    <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }]}>{item.ngay}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>{item.tongdagiamgia}</Text>
                    <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(1.7) }]}>{item.trangThai}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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
            </View>
            <View style={styles.content}>
                <View style={styles.boxTitle}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(1.7) }]}>
                        Tổng số hóa đơn
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen, fontSize: responsiveFontSize(1.7) }]}>
                        6
                    </Text>
                </View>
                <View>
                    {listItems}
                </View>
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
    },
    content: {
        backgroundColor: COLORS.color_white,
        height: '94%'
    }
})
export default ExportProductScreen;