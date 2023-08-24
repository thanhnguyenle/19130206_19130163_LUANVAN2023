import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTable, deleteTableNull, fetchTablesStart } from '../../redux_store/table/tableSlice';
import { RootState } from '../../app/store';
import { COLORS } from '../../constants/common';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import LoadingScreen, { loaderRef, showLoader, hideLoader } from "../../components/LoadingScreen";
import { deleteGroupTable, deleteGroupTableNull, fetchGroupTablesStart } from '../../redux_store/table/groupTableSlice';
import Toast from 'react-native-toast-message';
const TYPE = {
    TABLE: 'table',
    GROUPTABLE: 'grouptable',
}
const RoomTableScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(TYPE.TABLE);
    const tables = useSelector((state: RootState) => state.table.tableSevice.data);
    const groupTables = useSelector((state: RootState) => state.table.groupTablesSevice.data);
    useEffect(() => {
        dispatch(fetchTablesStart());
        dispatch(fetchGroupTablesStart());
    }, [dispatch]);
    const renderRightActions = (id: string) => (
        type === 'table' ?
            <TouchableOpacity style={styles.deleteBox} onPress={() => {
                Alert.alert(
                    'Cảnh báo',
                    'Bạn có muốn xóa bàn này không?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: async () => {
                                try {
                                    await dispatch(deleteTable(id)); // Gọi action để xóa
                                    showLoader();
                                    setTimeout(() => {
                                        hideLoader();
                                        Toast.show({
                                            type: 'success',// success, error, info, or any
                                            text1: 'Bạn xóa bàn thành công 👋',
                                            position: 'top',
                                        });
                                        dispatch(deleteTableNull());
                                        dispatch(fetchTablesStart());
                                    }, 1000);
                                } catch (error) {
                                    console.error('Delete error:', error);
                                    hideLoader();
                                    Alert.alert(
                                        'Thông báo',
                                        'Có lỗi xảy ra khi xóa bàn.',
                                    );
                                    Toast.show({
                                        type: 'error',// success, error, info, or any
                                        text1: 'Bạn xóa bàn không thành công 😞',
                                        position: 'top',
                                    });
                                }
                            }
                        }
                    ]);
            }}>
                <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.deleteBox} onPress={() => {
                Alert.alert(
                    'Cảnh báo',
                    'Bạn có muốn xóa khu vực này không?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'OK', onPress: async () => {
                                try {
                                    await dispatch(deleteGroupTable(id)); // Gọi action để xóa
                                    showLoader();
                                    setTimeout(() => {
                                        hideLoader();
                                        Toast.show({
                                            type: 'success',// success, error, info, or any
                                            text1: 'Bạn xóa khu vực thành công 👋',
                                            position: 'top',
                                        });
                                        dispatch(deleteGroupTableNull());
                                        dispatch(fetchGroupTablesStart());
                                    }, 1000);
                                } catch (error) {
                                    console.error('Delete error:', error);
                                    hideLoader();
                                    Toast.show({
                                        type: 'error',// success, error, info, or any
                                        text1: 'Bạn xóa khu vực không thành công 😞',
                                        position: 'top',
                                    });
                                }
                            }
                        }
                    ]);
            }}>
                <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
            </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 10, }}>
                <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                    <View style={type == 'table' ? styles.bgButton : styles.bgButton1}>
                        <TouchableOpacity onPress={() => { setType(TYPE.TABLE) }}>
                            <Text style={styles.textButton}>Bàn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={type == 'grouptable' ? styles.bgButton : styles.bgButton1}>
                        <TouchableOpacity onPress={() => { setType(TYPE.GROUPTABLE) }}>
                            <Text style={styles.textButton}>Khu vực</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                type === 'table' ?
                    <FlatList
                        style={{ flex: 1, width: '100%' }}
                        data={tables}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Swipeable renderRightActions={() => renderRightActions(item.id)} >
                                    <View style={styles.container1}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <View style={styles.box1}>
                                                    <Image source={require('../../assets/table.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                                </View>
                                                <View style={styles.box2}>
                                                    <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>{item.name}</Text>
                                                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2), }}>{item.numberOfPeople}</Text>
                                                </View>
                                                <View style={styles.box3}>
                                                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.2), marginBottom: 4 }}>{item.status}</Text>
                                                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{item.note}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>
                            )
                        }}
                        ItemSeparatorComponent={() => {
                            return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                        }}
                    /> :
                    <FlatList
                        style={{ flex: 1, width: '100%' }}
                        data={groupTables}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Swipeable renderRightActions={() => renderRightActions(item.id)} >
                                    <View style={styles.container1}>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                                <View style={styles.box1}>
                                                    <Image source={require('../../assets/khuvuc.jpg')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                                </View>
                                                <View style={styles.box2}>
                                                    <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>{item.name}</Text>
                                                </View>
                                                <View style={styles.box3}>
                                                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.2), marginBottom: 4 }}>{item.status}</Text>
                                                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(2) }}>{item.note}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>
                            )
                        }}
                        ItemSeparatorComponent={() => {
                            return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                        }}
                    />
            }

            <View style={styles.button}>
                <TouchableOpacity onPress={() => { navigation.replace('AddRoomTable') }}>
                    <Ionicons name='add' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
                </TouchableOpacity>
            </View>
            <LoadingScreen ref={loaderRef} />
        </View>
    );
};
const styles = StyleSheet.create({
    bgButton: {
        padding: 20,
        backgroundColor: COLORS.color_white,
        border: 1,
        borderColor: COLORS.darkGreen,
        marginHorizontal: 10,
        width: '44%',
        elevation: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderBottomColor: COLORS.darkGreen,
        borderWidth: 1,
    },
    bgButton1: {
        padding: 20,
        backgroundColor: COLORS.color_white,
        border: 1,
        borderColor: COLORS.darkGreen,
        width: '44%',
        marginHorizontal: 10,
        elevation: -1,
        borderRadius: 10,
        alignItems: 'center'
    },
    textButton: {
        color: COLORS.darkGreen,
        fontSize: 22,
        fontWeight: '500',
        letterSpacing: 3,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    container: {
        flex: 1,
        paddingHorizontal: 4,
        marginTop: 10,
    },
    heading: {
        fontSize: 18,
        marginLeft: 2,
        paddingVertical: 4,
        color: COLORS.color_black,
        fontWeight: '500',
        marginBottom: 2,
    },
    tableItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
    },
    container1: {
        textAlign: 'center',
        borderRadius: 5,
        width: '99.1%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        backgroundColor: COLORS.color_white,
        marginBottom: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    box1: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
    },
    box2: {
        width: responsiveWidth(40),
    },
    box3: {
        width: responsiveWidth(20),
    },
    deleteBox: {
        height: '100%',
        padding: 10,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04d4f',
    }
});
export default RoomTableScreen;