import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';

interface RadioButtonProps {
    title: string;
    value: string;
}

const RadioButtonCom: React.FC<RadioButtonProps> = ({ title, value }) => {

    return (
        <View style={styles.itemRadio}>
            <Text style={styles.titleRadio}>{title}</Text>
            <RadioButton value={value} color={COLORS.darkGreen} />
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

export default RadioButtonCom;
