import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { COLORS } from '../constants/common';
const { width, height } = Dimensions.get('window');
const CustomImageItem = ({ item, index, total }: any) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={{ uri: item.url }} />
        </View>
    );
};
const styles = StyleSheet.create({
    cardView: {
        position: 'relative',
        flex: 1,
        width: width - 5,
        height: height / 2,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 0,
        shadowColor: COLORS.color_black,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: width - 5,
        height: height / 2,
    },
});
export default CustomImageItem;
