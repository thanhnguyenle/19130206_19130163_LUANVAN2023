import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { createTable, dispatchGroupsNull } from '../../redux_store/table/tableSlice';
import { createGroupTable, dispatchTablesNull } from '../../redux_store/table/groupTableSlice';
import LoadingScreen, { loaderRef, showLoader, hideLoader } from "../../components/LoadingScreen";
import Toast from 'react-native-toast-message';
const TYPE = {
    TABLE: 'table',
    GROUPTABLE: 'grouptable',
}
const AddTableScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(TYPE.TABLE);
    const [name, setName] = useState('Lầu 1');
    const [note, setNote] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [status, setStatus] = useState('CREATE');
    const [groups, setGroups] = useState<string[]>([]);
    const selectedGroupTables = useSelector((state: RootState) => state.table.tableSevice.selectedGroupTables);
    const selectedGroupTablesText = selectedGroupTables.map((group) => group.name).join(',');
    const selectedGroupTablesId = selectedGroupTables.map((group) => group.id).join(',');
    const selectedTables = useSelector((state: RootState) => state.table.groupTablesSevice.selectedTables);
    const selectedTablesText = selectedTables.map((group) => group.name).join(',');
    const selectedTablesId = selectedTables.map((group) => group.id).join(',');
    async function handleCreateTable() {
        try {
            await dispatch(createTable({ name, numberOfPeople, note, status, groups: selectedGroupTablesId.split(',') }));
            showLoader();
            setTimeout(() => {
                hideLoader();
                Toast.show({
                    type: 'success',// success, error, info, or any
                    text1: 'Bạn tạo bàn thành công 👋',
                    position: 'top',
                });
                navigation.replace('RoomTable');
            }, 1000);
        } catch (error) {
            Toast.show({
                type: 'error',// success, error, info, or any
                text1: 'Bạn tạo bàn không thành công 😞',
                position: 'top',
            });
            hideLoader();
        }
    }
    async function handleCreateGroupTable() {
        try {
            await dispatch(createGroupTable({ name, note, status, tables: selectedTablesId.split(',') }));
            showLoader();
            setTimeout(() => {
                hideLoader();
                Toast.show({
                    type: 'success',// success, error, info, or any
                    text1: 'Bạn tạo khu vực thành công 👋',
                    position: 'top',
                });
                navigation.replace('RoomTable');
            }, 1000);
        } catch (error) {
            Toast.show({
                type: 'error',// success, error, info, or any
                text1: 'Bạn tạo khu vực không thành công 😞',
                position: 'top',
            });
            hideLoader();
        }

    }
    useEffect(() => {
        dispatch(dispatchGroupsNull());
        dispatch(dispatchTablesNull());
    }, [dispatch]);

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
            <ScrollView>
                <View style={styles.boxContent}>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tên</Text>
                        <InputComponent
                            value={name}
                            onChangeText={setName}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    {
                        type == 'table' ?
                            <View style={styles.itemContent}>
                                <Text style={styles.textTitle}>Số lượng</Text>
                                <InputComponent
                                    value={numberOfPeople + ''}
                                    onChangeText={setNumberOfPeople}
                                    placeholder=''
                                    style={styles.textContent}
                                />
                            </View>
                            : null
                    }

                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Ghi chú</Text>
                        <InputComponent
                            value={note}
                            onChangeText={setNote}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>{type === 'table' ? 'Khu vực' : 'Chọn bàn'}</Text>
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled>{type === 'table' ? selectedGroupTablesText : selectedTablesText}</TextInput>
                        <TouchableOpacity onPress={() => { type === 'table' ? navigation.push('SelectGroupTable') : navigation.push('SelectTables') }} style={{ width: '10%', }}>
                            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Trạng thái</Text>
                        <InputComponent
                            value={status}
                            onChangeText={setStatus}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center', flex: 1, marginTop: 10, marginBottom: 30, }}>
                    <ButtonComponent title={type === 'table' ? 'Thêm bàn' : 'Thêm khu vực'} onPress={async () => {
                        type === 'table' ? handleCreateTable() : handleCreateGroupTable();

                    }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                </View>
            </ScrollView>
            <LoadingScreen ref={loaderRef} />
        </View >
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
});
export default AddTableScreen;