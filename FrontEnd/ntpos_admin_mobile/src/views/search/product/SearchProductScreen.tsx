import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { SeclectCheck, ButtonCheck, RadioButtonCom } from '../../../components/index';
import { COLORS } from '../../../constants/common';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Iconicons from "react-native-vector-icons/Ionicons"
import searchProductScreen from '../../../store/search/SearchProductStore';

const SearchProductScreen = ({ navigation }: any) => {
    // tatca, vuotmuctonkho, duomuctonkho ,conhangtrongkho,hethangtrongkho  Tồn kho
    const [tonKho, setTonKho] = useState('tatca');
    //lựa chọn hiển thị tatca, hangngungkinhdoanh, hangdangkinhdoanh
    const [luachonhienthi, setLuaChonHienThi] = useState('tatca');
    //
    const [hang_hoa_thuong, setHangHoaThuong] = useState(true);
    const [che_bien, setCheBien] = useState(true);
    const [dich_vu, setDichVu] = useState(true);
    const [combo, setCombo] = useState(true);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Tìm theo</Text>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Iconicons name='search' color={COLORS.color_grey} size={25} />
                    </TouchableOpacity>
                    <TextInput placeholder='Tên hoặc mã hàng' style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}></TextInput>
                    <TouchableOpacity>
                        <Iconicons name='md-barcode-sharp' color={COLORS.color_grey} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxTypeCheck}>
                    <ButtonCheck title='Hàng hóa thường' isChecked={hang_hoa_thuong} onPress={() => {
                        setHangHoaThuong(!hang_hoa_thuong);
                    }} />
                    <ButtonCheck title='Chế biến' isChecked={che_bien} onPress={() => {
                        setCheBien(!che_bien);
                    }} />
                    <ButtonCheck title='Dịch vụ' isChecked={dich_vu} onPress={() => {
                        setDichVu(!dich_vu);
                    }} />
                    <ButtonCheck title='Combo' isChecked={combo} onPress={() => {
                        setCombo(!combo);
                    }} />
                </View>
                <View style={styles.boxInventory}>
                    <Text style={styles.title}>Tồn kho</Text>
                    <View style={styles.boxContentInventory}>
                        <RadioButton.Group onValueChange={newTonKho => setTonKho(newTonKho)} value={tonKho}>
                            <RadioButtonCom title='Tất cả' value='tatca' />
                            <RadioButtonCom title='Dưới mức tồn kho' value='duoimuctonkho' />
                            <RadioButtonCom title='Vượt mức tồn kho' value='vuotmuctonkho' />
                            <RadioButtonCom title='Còn hàng trong kho' value='conhangtrongkho' />
                            <RadioButtonCom title='Hết hàng trong kho' value='hethangtrongkho' />
                        </RadioButton.Group>
                    </View>
                </View>
                <View style={styles.boxInventory}>
                    <Text style={styles.title}>Chọn nhóm hàng</Text>
                    <View style={styles.boxContentInventory}>
                        <SeclectCheck title='Chọn nhóm hàng' onPress={() => {
                            navigation.push('DetailSelectCategory')
                        }} />
                    </View>
                </View>
                <View style={styles.boxInventory}>
                    <Text style={styles.title}>Lựa chọn hiển thị</Text>
                    <View style={styles.boxContentInventory}>
                        <RadioButton.Group onValueChange={newluachonhienthi => setLuaChonHienThi(newluachonhienthi)} value={luachonhienthi}>
                            <RadioButtonCom title='Tất cả' value='tatca' />
                            <RadioButtonCom title='Hàng ngừng kinh doanh' value='hangngungkinhdoanh' />
                            <RadioButtonCom title='Hàng đang kinh doanh' value='hangdangkinhdoanh' />
                        </RadioButton.Group>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
};
const styles = StyleSheet.create({
    boxSearch: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'center',
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
    text: {
        fontSize: responsiveFontSize(2.1),
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 1,
        paddingRight: 10,
        color: COLORS.color_grey,
    },
    container: {
        flex: 1,
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
    title: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveWidth(2),
    },
    boxInventory: {
    },
    boxContentInventory: {
    },
})
export default SearchProductScreen;