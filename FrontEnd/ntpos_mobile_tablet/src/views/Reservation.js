import React, { useState } from 'react'
import { Platform, View, TextInput, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import { covers } from './data';
import { COLORS } from '../constants/common';
import Icons from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker'
import NumberTwoButton from '../components/NumberTwoButton';
import Btn from '../components/Btn';
const Reservation = ({ navigation, route }) => {
    const { table } = route.params;
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date')
    const [time, setTime] = useState('Chọn giờ')
    const [dateTime, setDateTime] = useState('Chọn ngày')
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = (tempDate.getDate()) + '/' + parseInt(tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
        setDateTime(fDate)
        setTime(fTime);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const [number, setNumber] = useState('' + 1);
    const [note, setNote] = useState('Nhập ghi chú...');


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.containerCover}>
                    <FlatList
                        data={covers}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={styles.boxImage}>
                                <Image style={styles.containerImage} source={{ uri: `${item.imageUrl}` }} />
                            </View>
                        )
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={{ color: COLORS.color_black, fontSize: 20, marginTop: 10, fontWeight: '500' }}>Quán ăn</Text>
                    <View style={styles.boxInformationStore}>
                        <Icons name='location-pin' />
                        <Text style={{ color: COLORS.color_grey, fontSize: 14, marginTop: 4 }}>11/13 Trần Đại Nghĩa</Text>
                    </View>
                </View>
                <View style={styles.boxInformationOrder}>
                    <Text style={styles.title}>Thông tin đặt bàn</Text>
                    <View style={styles.option}>
                        <Text style={styles.subTitle}>Ngày đến</Text>
                        <View>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <Text style={{ color: COLORS.darkGreen, fontWeight: '500' }}>{dateTime}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.subTitle}>Thời gian</Text>
                        <View>
                            <TouchableOpacity onPress={() => showMode('time')}>
                                <Text style={{ color: COLORS.darkGreen, fontWeight: '500' }}>{time}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {show && (
                        <DateTimePicker
                            minimumDate={date}
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                    <View style={styles.option}>
                        <Text style={styles.subTitle}>Số lượng người</Text>
                        <NumberTwoButton
                            onChangeText={number => setNumber(number)}
                            keyboardType='numeric'
                            value={number}
                            maxLength={2}
                            setValue={setNumber}
                        />
                    </View>
                    <View style={styles.optionNote}>
                        <Text style={styles.subTitle}>Ghi chú</Text>
                        <TextInput
                            value={note}
                            onChangeText={note => setNote(note)}
                        />
                    </View>
                    <View style={styles.viewButton}>
                        <Btn
                            marginTop={20}
                            width={200}
                            borderColor={COLORS.darkGreen}
                            bgColor={COLORS.darkGreen}
                            fontSize={20}
                            textColor={COLORS.color_white}
                            title={'Đặt ngay'}
                            onPress={() => {
                            }} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );

};
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCover: {
        marginVertical: 20,
        marginHorizontal: 10,
        borderBottomWidth: 0.3,
        borderColor: COLORS.color_grey,
        marginBottom: 10,
    },
    boxImage: {
        margin: 1,
        width: width / 3 - 3,
        height: height / 5.8,
    },
    containerImage: {
        width: '100%',
        height: '100%',
    },
    boxInformationStore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    boxInformationOrder: {
        marginHorizontal: 10,
    },
    title: {
        textTransform: 'uppercase',
        color: COLORS.color_black,
        fontSize: 20,
        fontWeight: '500'
    },
    option: {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0.27,
        borderColor: COLORS.color_grey,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionNote: {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0.27,
        borderColor: COLORS.color_grey,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'column',
    },
    subTitle: {
        color: '#000000',
        fontSize: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    viewButton: {
        alignItems: 'center'
    }
})
export default Reservation;