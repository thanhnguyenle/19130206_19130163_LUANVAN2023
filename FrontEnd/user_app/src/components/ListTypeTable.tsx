import React, { useEffect } from 'react';
import {
    FlatList,
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/common';
const ListTypeTable = ({ data, navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.cardTitle}>
                <Text style={styles.title}>Tên Nhóm</Text>
            </View>
            <FlatList
                data={data}
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
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
                numColumns={3}
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
        height: '40%',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 20,
    },
    subtitle: {
        fontSize: 20,
        color: COLORS.darkGreen,
        fontWeight: '600',
        letterSpacing: 2,
    },
});
export default ListTypeTable;
