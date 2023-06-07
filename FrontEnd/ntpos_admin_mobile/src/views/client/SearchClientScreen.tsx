import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComboBox from '../../components/ComboboxComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setSearchType, setSearchValue } from '../../redux_store/client/filterSlice';
const SearchClientScreen = () => {
    const dispatch = useDispatch();
    const options = [
        { label: 'Tên', value: 'name' },
        { label: 'Tên đăng nhập', value: 'username' },
        { label: 'SDT', value: 'phoneNumber' },
        { label: 'Email', value: 'email' },
        { label: 'Địa chỉ', value: 'address' },
    ];
    const [selectedValue, setSelectedValue] = useState('');
    const [placeholderUI, setPlaceholderUI] = useState('');

    const [value, setValue] = useState('');
    const handleSelect = (item: any) => {
        setSelectedValue(item.value);
        dispatch(setSearchType(item.value))
        setPlaceholderUI(item.label)
    };
    return (
        <View>
            <ScrollView>
                <Text style={styles.text}>Tìm theo thông tin khách hàng</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.boxSearch}>
                        <TouchableOpacity>
                            <Ionicons name='search' color={COLORS.color_grey} size={18} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder={placeholderUI}
                            style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                            value={value}
                            onChangeText={(value) => {
                                setValue(value);
                                dispatch(setSearchValue(value.toLowerCase()));
                            }}
                        />
                    </View>
                    <View style={{ width: '25%' }}>
                        <ComboBox options={options} onSelect={handleSelect} title='Lựa chọn tìm kiếm theo trường' />
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
    title: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveWidth(2),
    },
    text: {
        fontSize: responsiveFontSize(2.1),
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 5,
        paddingRight: 10,
        color: COLORS.color_grey,
    },
    boxSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '70%',
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
});
export default SearchClientScreen;