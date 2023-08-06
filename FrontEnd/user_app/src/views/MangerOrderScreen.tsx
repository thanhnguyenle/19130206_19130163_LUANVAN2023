import React, { useState ,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { COLORS } from '../constants/common';
import Icons from 'react-native-vector-icons/Entypo';
import { orders } from '../constants/data';
import ItemOrder from '../components/ItemOrder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ordersRequest } from '../redux/order/orderSlice';

interface List {
    title: string;
    status: number;
}

const MangerOrder: React.FC<{ navigation: any }> = ({ navigation }) => {
    // const [listOrders, setListOrders] = useState(orders);
    const [isVisible, setIsVisible] = useState(false);
    const [fifter, setFifter] = useState(0);
    /** */
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.order.orders.loading);
    const error = useSelector((state: RootState) => state.order.orders.error);
    const listOrders = useSelector((state: RootState) => state.order.orders.orders);
    /** */
    const list: List[] = [
        { title: 'Chưa hoàn thành', status: 2 },
        { title: 'Đã hoàn thành', status: 1 },
        { title: 'Đã hủy', status: 3 },
    ];
    useEffect(() => {
        dispatch(ordersRequest('6dc08b8c-ac31-4413-98b4-1a2e0645fd2c'));
    }, [dispatch]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.fifterCard}>
                    <TouchableOpacity
                        onPress={() => setIsVisible(true)}
                        style={styles.button}
                    >
                        <Text style={{ color: COLORS.color_black }}>Trạng thái</Text>
                        <Icons name="chevron-down" />
                    </TouchableOpacity>
                    <BottomSheet modalProps={{}} isVisible={isVisible}>
                        {list.map((l, i) => (
                            <ListItem
                                style={styles.listItem}
                                key={i}
                                onPress={() => { }}
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
                </View>
                <View style={styles.listOrder}>
                    {listOrders.map((item, index) => (
                        // <ItemOrder navigation={navigation} item={item} key={index} />
                        <Text key={item.id} style={{color:'red'}}>{item.id}</Text>
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
        justifyContent: 'flex-start',
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
        fontSize: 16,
    },
});

export default MangerOrder;
