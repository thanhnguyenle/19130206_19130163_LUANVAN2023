import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Iconicons from "react-native-vector-icons/Ionicons"
import { COLORS } from '../constants/common';


interface SeclectCheckProps {
    title: string;
    onPress: () => void;
}

const SeclectCheck: React.FC<SeclectCheckProps> = ({ title, onPress, }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.itemBox}>
                <Text style={styles.title}>{title}</Text>
                <Iconicons name='md-chevron-forward-outline' color={COLORS.darkGreen} size={24} />
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: COLORS.color_white,
        paddingHorizontal: 8,
        paddingVertical: 15,
    },
    itemBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    title: {
        fontSize: responsiveFontSize(2.1),
        textAlign: 'center',
        color: COLORS.color_black,
        margin: 1,
    },
});

export default SeclectCheck;
