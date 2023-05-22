import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../constants/common'
interface ItemNotificationProps {
    username: string;
    content: string;
    time: string,
    onPress: () => void;
}

const ItemNotification: React.FC<ItemNotificationProps> = ({ username, content, onPress, time }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemNoti}>
                <Text>
                    <Text style={styles.name}>{username}</Text>
                    <Text> </Text>
                    <Text style={styles.content}>{content}</Text>
                </Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemNoti: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 10,
        flexDirection: 'column',
        backgroundColor: COLORS.color_white,
        width: responsiveWidth(100) - 14,
        borderRadius: 10,
        margin: 5,
        marginTop: 4,
        marginBottom: 4,
        justifyContent: 'flex-start'
    },
    name: {
        fontSize: responsiveFontSize(2.2),
        textTransform: 'capitalize',
        color: COLORS.color_black,
        fontWeight: '500',
        letterSpacing: 0.5,
        marginLeft: 10,

    },
    content: {
        fontSize: responsiveFontSize(2.2),
        marginBottom: 10,
        letterSpacing: 0.2,
        lineHeight: 28,
        color: COLORS.color_grey
    },
    time: {
        marginLeft: 4,
    }
});

export default ItemNotification;
