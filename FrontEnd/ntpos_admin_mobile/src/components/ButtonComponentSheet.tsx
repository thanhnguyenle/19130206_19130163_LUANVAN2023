import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextStyle } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';

interface ButtonSheetProps {
    title: string;
    onPress: () => void;
    titleStyle: TextStyle
}

const ButtonSheetCom: React.FC<ButtonSheetProps> = ({ title, onPress, titleStyle }) => {

    return (
        <View style={styles.itemRadio}>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.titleRadio, titleStyle]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemRadio: {
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.color_white
    },
    titleRadio: {
        paddingLeft: 10,
        fontSize: responsiveFontSize(2.1),
        textAlign: 'center',
        color: COLORS.color_black,
        margin: 1,
    },
});

export default ButtonSheetCom;
