import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid, ToastAndroid, Alert, Platform } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ImageCropPicker, { Image } from 'react-native-image-crop-picker';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { ButtonComponent, InputComponent } from '../../components';
import { RootState } from '../../app/store';
import { addClientRequest } from '../../redux_store/client/clientSlice';
import { dispatchGroupsNull } from '../../redux_store/client/group/groupSlice';
import LoadingScreen, { loaderRef, showLoader, hideLoader } from "../../components/LoadingScreen";
import Toast from 'react-native-toast-message';
const AddClientScreen = ({ navigation }: any) => {
    const [name, setName] = useState('nhu');
    const [username, setUserName] = useState('nhu');
    const [email, setEmail] = useState('mi');
    const [password, setPassword] = useState('mju');
    const [retyPassword, setRetyPassword] = useState('mju');
    const [phoneNumber, setPhoneNumber] = useState('mju');
    const [address, setAddress] = useState('mu');
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<ImagePickerResponse | null>(null);
    const [avatar, setAvatar] = useState<string>('');
    const selectedGroups = useSelector((state: RootState) => state.client.groups.selectedGroups);
    const selectedGroupsText = selectedGroups.map((group) => group.name).join(',');
    const selectedGroupsId = selectedGroups.map((group) => group.id).join(',');
    const groups = selectedGroupsId.split(',');
    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
            if (response) {
                setSelectedImage(response);
            }
        });
    };
    const uploadImage = async (fileUri: any) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: fileUri.assets[0].uri,
                name: fileUri.assets[0].fileName,
                type: fileUri.assets[0].type,
            });
            const response = await fetch('https://4cb1-27-65-196-160.ngrok-free.app/api/image', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gp',
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setAvatar(`https://4cb1-27-65-196-160.ngrok-free.app/api/image/${data.id}`);
            } else {
                console.log('Request failed with status:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };
    async function handleImageUpload(selectedImage: any) {
        await uploadImage(selectedImage);
    }

    async function handleAddClient() {
        console.log('Create client')
        // await handleImageUpload(selectedImage);
        try {
            await dispatch(addClientRequest({
                name,
                username,
                password,
                email,
                phoneNumber,
                address,
                avatar,
                groups,
            }));
            showLoader();
            setTimeout(() => {
                hideLoader();
                Toast.show({
                    type: 'success',// success, error, info, or any
                    text1: 'Bạn tạo người thành công 👋',
                    position: 'top',
                });
                navigation.replace('Client');
            }, 1000);
        } catch (error) {
            Toast.show({
                type: 'error',// success, error, info, or any
                text1: 'Bạn tạo người dùng không thành công 😞',
                position: 'top',
            });
            hideLoader();
        }
    }
    useEffect(() => {
        dispatch(dispatchGroupsNull());
    }, [dispatch]);
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <View style={{ flexDirection: 'row' }}>
                    {selectedImage && selectedImage.assets && (
                        <ImageBackground source={{ uri: selectedImage.assets[0].uri }}
                            style={{ width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white, alignItems: 'flex-end', justifyContent: 'flex-start' }}
                        >
                            <TouchableOpacity style={{ backgroundColor: '#00000030', borderRadius: 20 }} onPress={() => { setSelectedImage(null) }}>
                                <IconIocns name='close' size={40} color={COLORS.color_white} />
                            </TouchableOpacity>
                        </ImageBackground>
                    )}
                    <View style={{ alignItems: 'center', width: 150, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', marginLeft: 10, }}>
                        <TouchableOpacity onPress={() => {
                            handleChoosePhoto();
                        }}>
                            <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.boxContent}>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tên đăng nhập</Text>
                        <InputComponent
                            value={username}
                            onChangeText={setUserName}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Họ tên</Text>
                        <InputComponent
                            value={name}
                            onChangeText={setName}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Email</Text>
                        <InputComponent
                            value={email}
                            onChangeText={setEmail}
                            placeholder='@gmail.com'
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Mật khẩu</Text>
                        <InputComponent
                            value={password}
                            onChangeText={setPassword}
                            placeholder=''
                            secureTextEntry={true}
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhập lại mật khẩu</Text>
                        <InputComponent
                            value={retyPassword}
                            onChangeText={setRetyPassword}
                            placeholder=''
                            secureTextEntry={true}
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Số điện thoại</Text>
                        <InputComponent
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Địa chỉ</Text>
                        <InputComponent
                            value={address}
                            onChangeText={setAddress}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhóm người dùng</Text>
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled>{selectedGroupsText}</TextInput>
                        <TouchableOpacity onPress={() => { navigation.push('SelectGroup') }} style={{ width: '10%', }}>
                            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text></Text>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <ButtonComponent title='Thêm' onPress={() => {
                        handleAddClient();
                    }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                </View>
                <Text></Text>
            </ScrollView>
            <LoadingScreen ref={loaderRef} />
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