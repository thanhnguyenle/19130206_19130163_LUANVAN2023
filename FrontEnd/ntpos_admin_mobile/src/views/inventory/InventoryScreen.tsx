import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheet, CheckSheetComponent, RadioButtonCom } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RadioButton } from 'react-native-paper';
import { COLORS } from '../../constants/common';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ScrollView } from 'react-native-gesture-handler';

const InventoryScreen = ({ navigation }: any) => {
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
                        Tổng số phiếu
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen }]}>
                        6
                    </Text>

                </View>
            </View>
            <View>
                <Text style={styles.title}>Thứ 7, 15/4/2023</Text>
                <CheckSheetComponent checkSheet={{
                    idCheckSheet: '98392',
                    datetimeStart: 'Thứ 7, 15/4/2023',
                    datetimeEnd: 'Thứ 2, 20/4/2023',
                    operation: 'Đã cân bằng kho'
                }} onPress={() => {
                    navigation.push('DetailInventoryScreen')
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
        justifyContent: 'flex-start',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end'
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
export default InventoryScreen;