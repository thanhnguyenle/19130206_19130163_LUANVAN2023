import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fetchTablesNone1, fetchTablesStart } from "../../redux_store/table/tableSlice";
import { dispatchTablesNull } from '../../redux_store/table/groupTableSlice';
import { ButtonComponent } from "../../components";
const SelectTableScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.table.tableSevice.loading);
    const error = useSelector((state: RootState) => state.table.tableSevice.error);
    const data = useSelector((state: RootState) => state.table.tableSevice.dataTableNone);
    useEffect(() => {
        dispatch(fetchTablesNone1());
        dispatch(dispatchTablesNull());
    }, [dispatch]);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{ flex: 1, width: '100%'}}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.container1}>
                            <TouchableOpacity onPress={() => {
                                navigation.push('InformationOrderScreen', { id: item.id, name: item.name }
                                )
                            }}
                            >
                                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <View style={styles.box1}>
                                        <Image source={require('../../assets/table.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    </View>
                                    <View style={styles.box2}>
                                        <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 4 }}>{item.name}</Text>
                                        <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2), }}>{item.numberOfPeople}</Text>
                                    </View>
                                    <View style={styles.box3}>
                                        <Text style={{ color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2), marginBottom: 4 }}>{item.status}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                }}
            />
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10, }}>
                <ButtonComponent title='Bỏ qua' onPress={()=>{navigation.push('InformationOrderScreen', { id: '', name: 'Mang về' })}} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
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
    },
    deleteBox: {
        height: '100%',
        padding: 10,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04d4f',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    des: {
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
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
        justifyContent: 'flex-start',
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
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginHorizontal: 10,
    },
    box1: {
        width: responsiveWidth(18),
        height: responsiveWidth(18),
        marginRight: 10,
    },
    box2: {
        width: responsiveWidth(30),
    },
    box3: {
        width: responsiveWidth(24),
    },
    box4: {
        width: responsiveWidth(20),
        textAlign: 'center'
    },
});
export default SelectTableScreen;
