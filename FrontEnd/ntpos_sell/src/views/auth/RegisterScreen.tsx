import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ImageBackground, ImageStyle, Text, Animated, TouchableOpacity, Alert } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { InputComponent, ButtonComponent } from '../../components/index'
import { COLORS } from '../../constants/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('Minh Như');
    const [username, setUsername] = useState('minhnhu01');
    const [email, setEmail] = useState('19130163@st.hcmuaf.edu.vn');
    const [password, setPassword] = useState('01092001');
    const [phoneNumber, setPhoneNumber] = useState('0365448301');
    const [address, setAddress] = useState('11/13 Trần đại nghĩa');
    let scrollOffsetY = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={[styles.container, {}]}>
            <ImageBackground
                source={{ uri: 'https://i.imgur.com/Sql6zQ2.jpg' }}
                style={styles.imageBackground}
            >

                <View style={styles.boxTitle}>
                    <Text style={styles.title}>NTPOS</Text>
                </View>

                <View style={styles.boxBody}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                            { useNativeDriver: false }
                        )}
                    >
                        <Text style={styles.login}>Đăng ký</Text>
                        <InputComponent
                            value={name}
                            onChangeText={setName}
                            placeholder='Tên'
                            style={styles.input}
                        />
                        <InputComponent
                            value={username}
                            onChangeText={setUsername}
                            placeholder='Tên đăng nhập'
                            style={styles.input}
                        />
                        <InputComponent
                            value={email}
                            onChangeText={setEmail}
                            placeholder='Gmail'
                            style={styles.input}
                        />
                        <InputComponent
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Mật khẩu'
                            secureTextEntry={true}
                            style={[styles.input]}
                        />
                        <InputComponent
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder='Số điện thoại'
                            style={styles.input}
                        />
                        <InputComponent
                            value={address}
                            onChangeText={setAddress}
                            placeholder='Địa chỉ'
                            style={styles.input}
                        />

                        <ButtonComponent title={'Đăng ký'} onPress={() => { }} containerStyle={styles.button} />
                        <View style={styles.viewRegister}>
                            <Text style={[styles.text, {}]}>Đã có tài khoản?</Text>
                            <TouchableOpacity onPress={() => { }}>
                                <Text style={[styles.text, { marginLeft: 8, color: COLORS.darkGreen, fontWeight: '600' }]}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: responsiveHeight(1.2),
        paddingHorizontal: responsiveWidth(6),
        borderColor: COLORS.darkGreen,
        minWidth: '90%',
        maxWidth: '50%',
        marginBottom: responsiveWidth(6),
        fontSize: responsiveFontSize(2),
    },
    boxTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: COLORS.color_white,
        fontSize: responsiveFontSize(6),
        fontWeight: '500',
    },
    login: {
        color: COLORS.darkGreen,
        fontSize: responsiveFontSize(7),
        fontWeight: '600',
        marginBottom: responsiveHeight(2),
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
    } as ImageStyle,
    boxBody: {
        flex: 6,
        backgroundColor: 'white',
        width: '100%', // chiều rộng bằng 50% chiều rộng của thiết bị
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopRightRadius: 80,
        paddingTop: responsiveHeight(4),
    },
    button: {
        backgroundColor: COLORS.darkGreen,
        borderRadius: 10,
        minWidth: '60%',
        alignContent: 'center'
    },
    viewRegister: {
        marginTop: 20,
        flexDirection: 'row',
    },
    text: {
        color: COLORS.color_black,
        fontSize: responsiveFontSize(2),
    }
});

export default RegisterScreen;