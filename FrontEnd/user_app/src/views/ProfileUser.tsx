import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/common';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {logOut, requestReadUser} from "../redux/auth/loginSlice";
import {navigateToLogin} from "../redux/navigation/navigationSlice";
import {accuracyRequest} from "../redux/auth/registerSlice";
const ProfileUser = ({ navigation }: any) => {
    const isAuth = true;
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.login.user);
    useEffect(() => {
        setTimeout(() => {
                AsyncStorage.getItem('accessToken').then(value =>{
                        if (value != null) {
                            dispatch(requestReadUser(value));
                        }
                    }
                );
            }, 1000
        );
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Avatar.Image
                        source={{   uri: user.avatar == '' ? 'https://i.imgur.com/pHlXewJ.png' : user.avatar }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {}]}>{user.name}</Title>
                        <Caption style={styles.caption}>@{user.username}</Caption>
                        <TouchableRipple
                            onPress={() => {
                                navigation.navigate('EditProfile');
                            }}>
                            <Text style={{ color: COLORS.darkGreen }}>Cập nhật</Text>
                        </TouchableRipple>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" size={20} color="grey" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>
                        {user.address}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" size={20} color="grey" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>{user.phoneNumber}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" size={20} color="grey" />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>
                        {user.email}
                    </Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {
                    console.log('Xác thực');
                    dispatch(accuracyRequest(user.id));
                }}>
                    <View style={styles.menuItem}>
                        <Icons name="checksquareo" color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Xác thực tài khoản</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Thanh toán</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon
                            name="account-check-outline"
                            color={COLORS.darkGreen}
                            size={25}
                        />
                        <Text style={styles.menuItemText}>Hỗ trợ</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {
                    setTimeout( async() => {
                        await AsyncStorage.removeItem('accessToken');
                        await AsyncStorage.removeItem('refreshToken');
                        dispatch(logOut());
                        dispatch(navigateToLogin())
                    },1000)
                }}>
                    <View style={styles.menuItem}>
                        <Icons name="logout" color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Đăng xuất</Text>
                    </View>
                </TouchableRipple>
            </View>
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:COLORS.color_white
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:COLORS.color_black
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderTopColor: '#dddddd',
        borderTopWidth: 0.5,
        flexDirection: 'row',
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: COLORS.color_black,
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
export default ProfileUser;
