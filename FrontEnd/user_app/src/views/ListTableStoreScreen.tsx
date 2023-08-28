import React, {useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {  Text } from 'react-native-paper';
import {typeTable } from '../constants/data';
import {COLORS} from "../constants/common";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {requestListCategory} from "../redux/product/category/CategorySlice";
import {fetchProductsStart} from "../redux/product/product1/ProductSlice";
import {fetchGroupTablesStart} from "../redux/table/groupTableSlice";
const ListTableStore = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const groupTable = useSelector((state: RootState) => state.order.groupTables.data);
    useEffect(() => {
        dispatch(fetchGroupTablesStart());
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                nestedScrollEnabled
                data={groupTable}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <FlatList
                            data={item.tables}
                            renderItem={({ item }) => (
                                <View style={styles.itemTable}>
                                    <ImageBackground
                                        source={{
                                            uri: 'https://noithattruongsa.com/wp-content/uploads/2019/12/ban-ghe-nha-hang-dep-8-min.jpg',
                                        }}
                                        resizeMode="cover"
                                        style={styles.image}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('Reservation', { table: item });
                                            }}
                                            style={styles.button}>
                                            <Text style={styles.subtitle}>{item.name}</Text>
                                            <Text style={styles.subtitle1}>Số lượng người: {item.numberOfPeople}</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardTitle: {
        flexDirection: 'row',
    },
    title: {
        marginVertical: 8,
        marginHorizontal: 4,
        fontSize: 20,
    },
    itemTable: {
        height: height / 6,
        width: '32.2%',
        borderWidth: 2,
        borderColor: COLORS.darkGreen,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ffffff',
        package: 10,
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20,
    },
    subtitle: {
        fontSize: 20,
        color: COLORS.darkGreen,
        fontWeight: '700',
        letterSpacing: 2,
    },
    subtitle1: {
        fontSize: 12,
        color: COLORS.color_grey,
        fontWeight: '300',
        letterSpacing: 2,
        width:'90%',
        textAlign:'center'
    },
});
export default ListTableStore;
