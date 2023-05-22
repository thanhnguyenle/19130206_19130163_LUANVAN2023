import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchClientScreen = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    return (
        <View>
            <ScrollView>
                <Text style={styles.text}>Tìm theo thông tin khách hàng</Text>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={18} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Mã'
                        style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                        value={id}
                        onChangeText={(value) => { setId(value) }}
                    />
                </View>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={18} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Tên'
                        style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                        value={name}
                        onChangeText={(value) => { setName(value) }}
                    />
                </View>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={18} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Số điện thoại'
                        style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                        value={phoneNumber}
                        onChangeText={(value) => { setPhoneNumber(value) }}
                    />
                </View>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={18} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Địa chỉ'
                        style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                        value={address}
                        onChangeText={(value) => { setAddress(value) }}
                    />
                </View>
                <View style={styles.boxSearch}>
                    <TouchableOpacity>
                        <Ionicons name='search' color={COLORS.color_grey} size={18} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Email'
                        style={{ fontSize: responsiveFontSize(2.1), width: '80%', }}
                        value={email}
                        onChangeText={(value) => { setEmail(value) }}
                    />
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
});
export default SearchClientScreen;