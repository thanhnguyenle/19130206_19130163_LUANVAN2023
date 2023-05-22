import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { RadioButtonCom } from '../../../components/index'
import { FlatList } from 'react-native-gesture-handler';
import { table } from '../datatemp';

const DetailTypeTableScreen = () => {
    const [nhomhang, setNhomHang] = useState('tatca');
    const renderItem = ({ item }: any) => (
        <RadioButtonCom title={item.name} value={item.id} />
    );
    return (
        <View>
            <RadioButton.Group onValueChange={newnhomhang => {
                setNhomHang(newnhomhang)
            }} value={nhomhang}>
                <RadioButtonCom title='Tất cả' value='tatca' />
                <FlatList
                    data={table}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </RadioButton.Group>
        </View>
    );
};
export default DetailTypeTableScreen;