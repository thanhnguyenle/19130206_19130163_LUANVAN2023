import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { launchImageLibrary } from 'react-native-image-picker'
const AddClientScreen = ({ navigation }: any) => {
    const [urlPic, setUrlPic] = useState('');
    const [groupRoles, setRroupRoles] = useState([
        { id: 1, label: 'Checkbox 1', checked: false },
        { id: 2, label: 'Checkbox 2', checked: false },
        { id: 3, label: 'Checkbox 3', checked: false },
    ]);
    const setToastMsg = (msg: any) => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    function uploadImage() {
        launchImageLibrary({
            mediaType: 'photo',
        }, response => {
            if (response.didCancel) {
                setToastMsg('Thoát');
            } else if (response.errorCode = 'permission') {
                setToastMsg('permission')
            } else if (response.errorCode = 'others') {
                setToastMsg(response.errorMessage)
            } else {
                const selectedAssets = response.assets ?? [];
                if (selectedAssets.length > 0) {
                    const selectedImageUri = selectedAssets[0].uri;
                    console.log('Selected image URI: ', selectedImageUri);
                    setUrlPic(selectedImageUri + '');
                }
            }
        })
    }
    const openImageLibrary = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
                includeBase64: true,// specify the media type to limit the selection to photos only
            },
            (response) => {
                const fileSize = response.assets?.[0]?.fileSize ?? 0;
                const base64: string | number = response?.assets?.[0]?.base64 ?? 0;
                if (response.didCancel) {
                    setToastMsg('Cancelled image selection');
                } else if (response.errorCode = 'permission') {
                    setToastMsg('Demo');
                } else if (response.errorCode = 'others') {
                    setToastMsg(response.errorMessage);
                } else if (fileSize > 2097152) {
                    alert('Demo');
                } else {
                    setUrlPic(base64 + '');
                }
            }
        );
    };

    function removeImage() {
        alert('remove')
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <View style={{ flexDirection: 'row' }}>
                    <ImageBackground source={{
                        uri: 'data:image/png;base64' + urlPic
                    }}
                        style={{ width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white, alignItems: 'flex-end', justifyContent: 'flex-start' }}
                    >
                        <TouchableOpacity style={{ backgroundColor: '#00000030', borderRadius: 20 }} onPress={() => { removeImage() }}>
                            <IconIocns name='close' size={40} color={COLORS.color_white} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={{ alignItems: 'center', width: 150, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', marginLeft: 10, }}>
                        <TouchableOpacity onPress={() => { openImageLibrary() }}>
                            <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.boxContent}>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tên đăng nhập</Text>
                        <TextInput style={styles.textContent} placeholder=''></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Họ tên</Text>
                        <TextInput style={styles.textContent} placeholder=''></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Email</Text>
                        <TextInput style={[styles.textContent,]} placeholder='@gmail.com'></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Mật khẩu</Text>
                        <TextInput style={styles.textContent} placeholder='' secureTextEntry={true}></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhập lại mật khẩu</Text>
                        <TextInput style={styles.textContent} placeholder='' secureTextEntry={true}></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Số điện thoại</Text>
                        <TextInput style={styles.textContent} placeholder=''></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Địa chỉ</Text>
                        <TextInput style={styles.textContent} placeholder=''></TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhóm hàng</Text>
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled></TextInput>
                        <TouchableOpacity onPress={() => { navigation.push('SelectGroup') }} style={{ width: '10%', }}>
                            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
export default AddClientScreen;