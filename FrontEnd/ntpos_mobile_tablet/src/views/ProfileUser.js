import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../constants/common';
import Btn from '../components/Btn';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/AntDesign'
const ProfileUser = ({ navigation }) => {
    const isAuth = true;

    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{ uri: 'https://i.imgur.com/pHlXewJ.png' }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {

                        }]}>John Doe</Title>
                        <Caption style={styles.caption}>@jonde</Caption>
                        <TouchableRipple onPress={() => { navigation.navigate('EditProfile') }}>
                            <Text style={{ color: COLORS.darkGreen }}>Cập nhật</Text>
                        </TouchableRipple>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name='map-marker-radius' size={20} />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>11/13 Trần Đại Nghĩa</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='phone' size={20} />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>0365448301</Text>
                </View>
                <View style={styles.row}>
                    <Icon name='email' size={20} />
                    <Text style={{ color: '#777777', marginLeft: 20 }}>19130163@st.hcmuaf.edu.vn</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <TouchableRipple style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}
                    onPress={() => { }}
                >
                    <View>
                        <Title style={{ fontWeight: '800' }}>140</Title>
                        <Caption>Ví điểm</Caption>
                    </View>
                </TouchableRipple>
                <TouchableRipple style={styles.infoBox} onPress={() => { }}>
                    <View >
                        <Title style={{ fontWeight: '800' }}>12</Title>
                        <Caption>Đặt bàn</Caption>
                    </View>
                </TouchableRipple>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name='credit-card' color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Thanh toán</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name='account-check-outline' color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Hỗ trợ</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icons name='setting' color={COLORS.darkGreen} size={25} />
                        <Text style={styles.menuItemText}>Cài đặt</Text>
                    </View>
                </TouchableRipple>
            </View>
        </View>
    );
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
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
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    }

})
export default ProfileUser
