import React, { useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, ImageStyle, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { loginRequest } from '../../redux/auth/loginSlice';
import { navigateToRegister } from '../../redux/navigation/navigationSlice';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
type RootStackParamList = {
    Admin: undefined;
    Auth: undefined;
    Register: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;
interface LoginScreenProps {
    navigation: LoginScreenNavigationProp;
}

declare const alert: (message?: string) => void;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState('12@gmail.com');
    const [password, setPassword] = useState('1234');
    const loading = useSelector((state: RootState) => state.auth.login.loading);
    const error = useSelector((state: RootState) => state.auth.login.error);
    const dispatch = useDispatch();
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }
        dispatch(loginRequest({ email, password }));
    };
    return (
        <View style={[styles.container, {}]}>
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
                        <Text style={styles.login}>Đăng nhập</Text>
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
                        <ButtonComponent title={!loading ? 'Đăng nhập' : 'Đang đăng nhập..'} onPress={handleLogin} containerStyle={styles.button} />
                        <View style={styles.viewRegister}>
                            <TouchableOpacity onPress={() => { Alert.alert('Quên mật khẩu') }}>
                                <Text style={[styles.text, { marginLeft: 8, color: COLORS.darkGreen, fontWeight: '600' }]}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewRegister}>
                            <Text style={[styles.text, {}]}>Tạo tài khoản mới?</Text>
                            <TouchableOpacity onPress={() => { dispatch(navigateToRegister()) }}>
                                <Text style={[styles.text, { marginLeft: 8, color: COLORS.darkGreen, fontWeight: '600' }]}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(6),
        borderColor: COLORS.darkGreen,
        minWidth: '90%',
        maxWidth: '50%',
        marginBottom: responsiveWidth(6),
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black,
    },
    boxTitle: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: COLORS.color_white,
        fontSize: responsiveFontSize(8),
        fontWeight: '500',
    },
    login: {
        color: COLORS.darkGreen,
        fontSize: responsiveFontSize(7),
        fontWeight: '600',
        marginBottom: responsiveHeight(5),
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center',
    } as ImageStyle,
    boxBody: {
        flex: 3,
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
        fontSize: responsiveFontSize(2.2),
    }
});

export default LoginScreen;