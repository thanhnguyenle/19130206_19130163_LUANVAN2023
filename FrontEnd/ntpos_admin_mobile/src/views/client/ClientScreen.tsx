import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { BottomSheet, RadioButtonCom } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { RadioButton } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../../constants/common';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../../redux_store/client/clientSlice';
import { RootState } from '../../app/store';
import { format } from 'date-fns';
import { setTime } from '../../redux_store/client/filterSlice';
const ClientScreen = ({ navigation }: any) => {
    const [locThoiGia, setLocThoiGian] = useState('toanthoigia');
    function getNameTitle(value: string): string {
        let valueNew = '';
        switch (value) {
            case 'homnay':
                valueNew = 'Hôm nay'
                break;
            case 'homqua':
                valueNew = 'Hôm qua'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'tuannnay':
                valueNew = 'Tuần này'
                break;
            case 'tuantruoc':
                valueNew = 'Tuần trước'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'thangnay':
                valueNew = 'Tháng này'
                break;
            case 'thangtruoc':
                valueNew = 'Tháng trước'
                break;
            default:
                break;
        }
        return valueNew;
    }
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.client.users.loading);
    const error = useSelector((state: RootState) => state.client.users.error);
    const users = useSelector((state: RootState) => state.client.users.users);
    const number = useSelector((state: RootState) => state.client.users.size);
    const handleDateChange = (value: any) => {
        setLocThoiGian(value);
        processSelectedDate(value);
    };
    const processSelectedDate = (date: any) => {
        // Xử lý giá trị ngày được chọn
        switch (date) {
            case 'homnay': 1683386773984
                dispatch(setTime('TODAY'))
                break;
            case 'homqua':
                dispatch(setTime('YESTERDAY'))
                break;
            case 'toanthoigia':
                dispatch(setTime('ALL_TIME'))
                break;
            case 'tuannnay':
                dispatch(setTime('THIS_WEEK'))
                break;
            case 'tuantruoc':
                dispatch(setTime('LAST_WEEK'))
                break;
            case 'thangnay':
                dispatch(setTime('THIS_MONTH'))
                break;
            case 'thangtruoc':
                dispatch(setTime('LAST_MONTH'))
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return <Text>Lỗi: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxFifter}>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                    icon={<Ionicons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
                    height={460}
                    content={
                        <RadioButton.Group onValueChange={handleDateChange} value={locThoiGia}>
                            <RadioButtonCom title='Toàn thời gian' value='toanthoigia' />
                            <RadioButtonCom title='Hôm nay' value='homnay' />
                            <RadioButtonCom title='Hôm qua' value='homqua' />
                            <RadioButtonCom title='Tuần này' value='tuannnay' />
                            <RadioButtonCom title='Tuần trước' value='tuantruoc' />
                            <RadioButtonCom title='Tháng này' value='thangnay' />
                            <RadioButtonCom title='Tháng trước' value='thangtruoc' />
                        </RadioButton.Group>
                    } />
                <View style={styles.boxTitle}>
                    <Text style={[styles.text, { marginLeft: 2, marginRight: 2, color: COLORS.darkGreen }]}>
                        {number}
                    </Text>
                    <Text style={styles.text}>
                        Khách hàng
                    </Text>
                </View>
            </View>
            <View style={styles.list}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.push('DetailClient', { id: item.id.toString() })
                        }}>
                            <View style={styles.itemAccount}>
                                <View style={styles.avatar}>
                                    <ImageBackground source={{ uri: 'https://i.imgur.com/czQ9CWT.png' }} style={styles.imageBg}>
                                        <Text style={styles.avatarText}></Text>
                                    </ImageBackground>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.text1}>{item.name != '' ? item.name : (item.username != '' ? item.username : item.email)}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 4, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Liên hệ:</Text>
                                        <Text style={styles.phone}>{item.phoneNumber === '' ? item.email : item.phoneNumber}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.push('AddClient') }}>
                    <Ionicons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    boxFifter: {
        paddingTop: responsiveHeight(1),
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        paddingBottom: responsiveHeight(1),
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    boxTitle: {
        flexDirection: 'row',
        marginRight: responsiveWidth(5),
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_grey,
    },
    title: {
        marginBottom: responsiveHeight(1),
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(2),
    },
    list: {
        backgroundColor: COLORS.color_white,
        flex: 1,
        borderTopRadius: 5,
        elevation: 1,
        padding: 10,
    },
    itemAccount: {
        paddingBottom: 5,
        paddingTop: 5,
        flexDirection: 'row',
        borderBottomColor: COLORS.color_grey_seconds,
        borderBottomWidth: 0.3,
    },
    avatar: {
        backgroundColor: COLORS.bgGreen1,
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBg: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: responsiveFontSize(4),
        color: COLORS.darkGreen,
        textTransform: 'uppercase'
    },
    content: {
        marginLeft: 10,
    },
    text1: {
        fontSize: responsiveFontSize(2.3),
        color: COLORS.color_black,
        fontWeight: '500'
    },
    phone: {
        color: COLORS.color_grey,
        fontSize: responsiveFontSize(2),
        marginLeft: 10,
    }
})
export default ClientScreen;