import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RadioButtonCom } from '../../../components/index'

const DetailTypeProductSceen = () => {
    const [nhomhang, setNhomHang] = useState('tatca');
    return (
        <View>
            <RadioButton.Group onValueChange={newnhomhang => {
                setNhomHang(newnhomhang)
            }} value={nhomhang}>
                <RadioButtonCom title='Tất cả' value='tatca' />
                <RadioButtonCom title='Bia & Rượu' value='bia' />
                <RadioButtonCom title='Nước ngọt' value='nuocngot' />
            </RadioButton.Group>
        </View>
    );
};
export default DetailTypeProductSceen;