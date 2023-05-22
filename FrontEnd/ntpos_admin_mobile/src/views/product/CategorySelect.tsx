import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, RadioButtonCom } from '../../components';
import { RadioButton } from 'react-native-paper';
const CategorySelectScreen = () => {
    const [loaihang, setLoaihang] = useState('Tất cả');
    return (
        <View style={styles.container}>
            <Text></Text>
            <View style={styles.boxSearch}>
                <TextInput placeholder='Thêm nhóm hàng' style={{
                    fontSize: responsiveFontSize(2.1),
                    width: '79%',
                    backgroundColor: COLORS.color_white,
                    marginRight: 5,
                }} />
                <ButtonComponent title='Thêm' onPress={() => { }} containerStyle={{ width: '18%', backgroundColor: COLORS.darkGreen }} />
            </View>
            <View style={styles.listCategory}>
                <Text></Text>
                <RadioButton.Group onValueChange={newLoaiHang => setLoaihang(newLoaiHang)} value={loaihang}>
                    <RadioButtonCom title='Tất cả' value='Tất cả' />
                    <RadioButtonCom title='Bia' value='Bia' />
                    <RadioButtonCom title='Nước' value='Nước' />
                </RadioButton.Group>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
export default CategorySelectScreen;