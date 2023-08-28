import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants/common';

const { width, height } = Dimensions.get('window');

interface ItemCategoryProps {
    item: {
        imageUrl: string;
        name: string;
    };
    onPress?: () => void;
}

const ItemCategory: React.FC<ItemCategoryProps> = ({ item, onPress }) => {
    const data = [
        {name: 'Đồ uống',   imageUrl: 'https://i.imgur.com/vL2IfKu.png',},
        {name: 'Lẩu',   imageUrl: 'https://i.imgur.com/xHDFRUH.png',},
        {name: 'Nướng',   imageUrl: 'https://i.imgur.com/SV7Sn1K.png',},
        {name: 'Đồ uống nóng',   imageUrl: 'https://i.imgur.com/YxdPvzG.png',},
        {name: 'Hải sản',   imageUrl: 'https://i.imgur.com/nSOCRh5.png',},
        {name: 'Sinh tố',   imageUrl: 'https://i.imgur.com/fAYOgfy.png',},
        {name: 'Soda',   imageUrl: 'https://i.imgur.com/fAYOgfy.png',},
        {name: 'Trà sữa',   imageUrl: 'https://i.imgur.com/7CIrwjR.png',},
    ];
    const foundItem = data.find(dataItem => dataItem.name === item.name);
    return (
        <TouchableOpacity style={styles.cardView} onPress={onPress}>
            {foundItem ? (
                <Image style={styles.image} source={{ uri: foundItem.imageUrl }} />
            ) : (
                <Image style={styles.image} source={{uri: 'https://i.imgur.com/SV7Sn1K.png'}} />
            )}
            <Text style={styles.itemTitle}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: 102,
        height: 82,
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: COLORS.color_black,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        elevation: 0.7,
        alignItems: 'center',
    },
    image: {
        height: 60,
        width: 70,
        marginBottom: -2,
    },
    itemTitle: {
        color: COLORS.color_black,
        fontSize: 11,
    },
});

export default ItemCategory;
