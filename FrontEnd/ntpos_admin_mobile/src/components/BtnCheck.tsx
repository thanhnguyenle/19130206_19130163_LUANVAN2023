import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';

interface ButtonCheckProp {
    title: string;
    isChecked: boolean;
    onPress: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const ButtonCheck: React.FC<ButtonCheckProp> = ({ title, onPress, isChecked, containerStyle, titleStyle }) => {

    return (
        <TouchableOpacity style={[styles.container, containerStyle, { backgroundColor: isChecked ? COLORS.darkGreen : '#ffffff', }]} onPress={onPress}>
            <Text style={[styles.title, titleStyle, { color: isChecked ? '#ffffff' : 'grey' }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: COLORS.darkGreen,
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 8,
        margin: 2,
    },
    title: {
        fontSize: responsiveFontSize(1.8),
        textAlign: 'center',
        color: '#ffffff',
    },
});

export default ButtonCheck;
