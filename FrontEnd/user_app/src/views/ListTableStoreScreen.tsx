import React, {useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {COLORS} from "../constants/common";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {fetchGroupTablesStart} from "../redux/table/groupTableSlice";
const ListTableStore = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const groupTable = useSelector((state: RootState) => state.order.groupTables.data);
    useEffect(() => {
        dispatch(fetchGroupTablesStart());
    }, []);
    return (
        <View style={styles.container}>
            <Text style={{color:COLORS.color_grey, marginTop:5}}>Thời gian</Text>
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
                            renderItem={({ item }:any) => (
                                <View style={styles.itemTable}>
                                    <ImageBackground
                                        source={{
                                            uri: item.isBusy === false ? 'https://noithattruongsa.com/wp-content/uploads/2019/12/ban-ghe-nha-hang-dep-8-min.jpg':'https://www.huongnghiepaau.com/wp-content/uploads/2022/12/quy-trinh-dat-ban-nha-hang.jpg',
                                        }}
                                        resizeMode="cover"
                                        style={styles.image}>
                                        {
                                            item.isBusy === false ?
                                             <View
                                                style={styles.button}>
                                                <Text style={[styles.subtitle,{fontWeight: '800', color: COLORS.darkGreen}]}>{item.name}</Text>
                                                <Text style={[styles.subtitle1,{fontWeight: '500'}]}>Số lượng: {item.numberOfPeople}</Text>
                                            </View> :
                                            <View
                                                style={styles.buttonBusy}>
                                                <Text style={[styles.subtitle1,{fontWeight: '900', color: COLORS.color_white}]}>{item.name}</Text>
                                                <Text style={[styles.subtitle1,{fontWeight: '900', color: COLORS.color_white}]}>Bàn đã đặt</Text>
                                            </View>
                                        }

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
        backgroundColor:COLORS.color_white
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
    buttonBusy: {
        backgroundColor:'rgba(150,150,150,0.58)',
        package: 10,
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20,
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.71)',
        package: 10,
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20,
    },
    subtitle: {
        fontSize: 18,
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
