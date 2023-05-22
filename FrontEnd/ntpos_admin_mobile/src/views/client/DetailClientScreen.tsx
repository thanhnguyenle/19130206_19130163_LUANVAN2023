import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { fetchClientRequest } from '../../redux_store/client/detailClientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { COLORS } from '../../constants/common';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { BottomSheet } from '../../components';
import { deleteClientRequest } from '../../redux_store/client/deleteClientSlice';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
const DetailClientScreen = ({ route, navigation }: any) => {
    const { id } = route.params;
    const user = useSelector((state: RootState) => state.client.userDetail.user);
    const dispatch = useDispatch();
    let scrollOffsetY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        dispatch(fetchClientRequest(id));
    }, []);

    return (

        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tên đăng nhập</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.username}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tên</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.name}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Gmail</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.email}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Số điện thoại</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.phoneNumber}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Địa chỉ</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.address}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Nhóm</Text>
                </View>
                <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{user?.groups}</Text>
            </View>

            <View style={styles.button}>
                <BottomSheet title='' fontSize={12}
                    icon={<Ionicons name='trash-outline' size={20} style={{ color: COLORS.color_white, padding: 15 }} />}
                    height={130}
                    content={
                        <TouchableOpacity onPress={() => {
                            dispatch(deleteClientRequest(id));
                            navigation.pop();
                        }}>
                            <View style={{ marginTop: 10, padding: 10, alignItems: 'center' }}>
                                <Text style={{ color: COLORS.color_red, fontSize: 16 }}>Xóa khách hàng</Text>
                            </View>
                        </TouchableOpacity>
                    } />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: COLORS.color_white,
        borderBottomWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        justifyContent: 'space-between',
    },
    text: {
        color: COLORS.color_grey,
        fontSize: responsiveFontSize(2),
    },
    left: {
        flexDirection: 'row'
    },
    boxListFood: {
        marginTop: 10,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
});
export default DetailClientScreen;