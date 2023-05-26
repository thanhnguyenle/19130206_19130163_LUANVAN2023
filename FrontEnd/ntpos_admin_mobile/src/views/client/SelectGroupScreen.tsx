import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, RadioButtonCom } from '../../components';
import { RadioButton } from 'react-native-paper';
const SelectGroupScreen = ({ navigation }: any) => {
    const [loaihang, setLoaihang] = useState('Tất cả');
    return (
        <View style={styles.container}>
            {/* <View style={styles.boxSearch}>
                <TextInput placeholder='Thêm nhóm' style={{
                    fontSize: responsiveFontSize(2.1),
                    width: '79%',
                    backgroundColor: COLORS.color_white,
                    marginRight: 5,
                }} />
                <ButtonComponent title='Thêm' onPress={() => { }} containerStyle={{ width: '18%', backgroundColor: COLORS.darkGreen }} />
            </View> */}
            <View style={styles.listCategory}>
                <RadioButton.Group onValueChange={newLoaiHang => setLoaihang(newLoaiHang)} value={loaihang}>
                    <RadioButtonCom title='Tất cả' value='Tất cả' />
                    <RadioButtonCom title='Bia' value='Bia' />
                    <RadioButtonCom title='Nước' value='Nước' />
                </RadioButton.Group>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddGroup') }}>
                    <Ionicons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    boxSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        textAlign: 'center',
        margin: 4,
        borderRadius: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderStartWidth: 0.5,
        borderEndWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        // backgroundColor: COLORS.color_white,
    },
    listCategory: {

    }
});
export default SelectGroupScreen;