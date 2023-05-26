import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ButtonComponent } from '../../components';
const AddGroupScreen = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            <View style={styles.boxContent}>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Tên nhóm</Text>
                    <TextInput style={styles.textContent} placeholder=''></TextInput>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Mô tả</Text>
                    <TextInput style={styles.textContent} placeholder=''></TextInput>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.textTitle}>Cấp quyền</Text>
                    <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled></TextInput>
                    <TouchableOpacity onPress={() => { navigation.push('SelectRole') }} style={{ width: '10%', }}>
                        <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text></Text>
            <ButtonComponent title='Thêm' onPress={() => { }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    boxImage: {
        marginTop: 10,
        marginBottom: 10,
        height: '20%',
        alignItems: 'center',
    },
    boxContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.color_white
    },
    name: {
        fontSize: responsiveFontSize(2.5),
        color: COLORS.color_black,
        fontWeight: '500',
        marginBottom: 10,
    },
    itemContent: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        width: '30%',
        fontSize: responsiveFontSize(2.1),
        color: COLORS.color_grey
    },
    textContent: {
        width: '70%',
        fontSize: responsiveFontSize(2.3),
        borderBottomWidth: 0.6,
        borderColor: COLORS.color_grey_seconds,
        paddingBottom: 10,
        color: COLORS.color_black,
    },
    box: {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.color_white
    },
    des: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    }
});
export default AddGroupScreen;