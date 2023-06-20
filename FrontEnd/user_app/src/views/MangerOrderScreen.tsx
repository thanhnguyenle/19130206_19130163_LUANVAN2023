import React, { useState } from 'react';
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

interface List {
    title: string;
    status: number;
}

const MangerOrder: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [listOrders, setListOrders] = useState(orders);
    const [isVisible, setIsVisible] = useState(false);
    const [fifter, setFifter] = useState(0);
    const list: List[] = [
        { title: 'Chưa hoàn thành', status: 2 },
        { title: 'Đã hoàn thành', status: 1 },
        { title: 'Đã hủy', status: 3 },
    ];

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
                        <ItemOrder navigation={navigation} item={item} key={index} />
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