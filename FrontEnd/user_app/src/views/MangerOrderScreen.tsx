import React, { useState ,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    SafeAreaView, Image,
} from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { COLORS } from '../constants/common';
import Icons from 'react-native-vector-icons/Entypo';
import { orders } from '../constants/data';
import ItemOrder from '../components/ItemOrder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ordersRequest } from '../redux/order/orderSlice';
import {colorStatus, formatDateFromNumber, shortenOrderID, stringStatus} from "../utils/function";

interface List {
    title: string;
    status: string;
}

const MangerOrder: React.FC<{ navigation: any }> = ({ navigation }) => {
    const list: List[] = [
        { title: 'Chưa hoàn thành', status: 'CREATED' },
        { title: 'Đã hoàn thành', status: 'PAYMENT' },
        { title: 'Đã hủy', status: 'CANCER' },
        { title: 'Tất cả', status: '' },
    ];
    const [isVisible, setIsVisible] = useState(false);
    const [filteredObject, setFilteredObject] = useState(list[3].status);
    /** */
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.order.orders.loading);
    const error = useSelector((state: RootState) => state.order.orders.error);
    const listOrders = useSelector((state: RootState) => state.order.orders.orders);
    const user = useSelector((state: RootState) => state.auth.login.user);
    /** */

    const filteredOrders = listOrders.filter(item => {
        if (filteredObject === '') return true; // Hiển thị tất cả nếu đối tượng là 'Tất cả'
        return item.status === filteredObject;
    });
    useEffect(() => {
        dispatch(ordersRequest(user.id));
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.fifterCard}>
                    <TouchableOpacity
                        onPress={() => setIsVisible(true)}
                        style={styles.button}
                    >
                        <Text style={{ color: COLORS.color_black }}>Trạng thái </Text>
                        <Icons name="chevron-down" />
                    </TouchableOpacity>
                    <BottomSheet modalProps={{}} isVisible={isVisible}>
                        {list.map((l, i) => (
                            <ListItem
                                style={styles.listItem}
                                key={i}
                                onPress={() => {setFilteredObject(l.status)}}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                        <ListItem onPress={() => setIsVisible(false)}>
                            <ListItem.Content>
                                <ListItem.Title>Thoát</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </BottomSheet>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{ color: COLORS.color_black, fontSize:15 }}> Số lượng </Text>
                        <Text style={{ color: COLORS.darkGreen, fontSize:15, fontWeight:'600'  }}>{listOrders.length} </Text>
                    </View>
                </View>
                <View style={styles.listOrder}>
                    {filteredOrders.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemOrder}
                            onPress={() => {
                                navigation.navigate('OrderDetail', { order: item });
                            }}
                        >
                            <View style={styles.imageView}>
                                <Image
                                    source={{ uri: 'https://i.imgur.com/SI8fnq8.png' }}
                                    style={{ width: '100%', height: '80%' }}
                                />
                            </View>
                            <View style={styles.information}>
                                <Text style={styles.text}>ID: {shortenOrderID(item.id)}</Text>
                                <Text style={styles.text}>Bàn: {item.tables.length > 0 ? item.tables[0].name:'...'}</Text>
                                <Text style={styles.text}>Thời gian: {formatDateFromNumber(parseInt(item.orderDate))}</Text>
                                <Text style={[styles.text, { color: colorStatus(item.status) }]}>
                                    Trạng thái: {stringStatus(item.status)}
                                </Text>
                            </View>
                            <View style={styles.groupButton}>
                                <TouchableOpacity
                                    style={[styles.buttonItem, { backgroundColor: '#fc2003' }]}
                                >
                                    <Text style={{ color: COLORS.color_white }}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonItem, { backgroundColor: '#097ebd' }]}
                                >
                                    <Text style={{ color: COLORS.color_white }}>Liên hệ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonItem, { backgroundColor: '#04c70e' }]}
                                >
                                    <Text style={{ color: COLORS.color_white }}>Đặt lại</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        backgroundColor: 'red',
    },
    fifterCard: {
        marginTop: 2,
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginRight:20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 6,
        backgroundColor: COLORS.color_white,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 0.3,
        borderRadius: 5,
        borderColor: '#00000090',
    },
    listOrder: {
        flexDirection: 'column',
        flex: 1,
        marginTop: 10,
    },
    text: {
        color: COLORS.color_black,
        padding: 1,
        fontSize: 14,
    },
    itemOrder: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: COLORS.color_white,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        height: height / 7,
        borderRadius: 10,
        elevation: 1,
    },
    information: {
        width: '60%',
        margin: 4,
    },
    imageView: {
        width: '15%',
        marginLeft: 10,
        marginRight: 10,
    },
    groupButton: {
        marginRight: 10,
        width: '18%',
        flexDirection: 'column',
    },
    buttonItem: {
        backgroundColor: 'red',
        marginTop: 2,
        marginBottom: 2,
        alignItems: 'center',
        borderRadius: 10,
        padding: 2,
    },
});

export default MangerOrder;
