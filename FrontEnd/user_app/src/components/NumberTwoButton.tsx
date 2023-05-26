import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import { COLORS } from '../constants/common';

interface NumberTwoButtonProps {
    value: string;
    setValue: (value: string) => void;
    onChangeText?: (text: string) => void;
    keyboardType?: string;
    maxLength?: number;
}

const NumberTwoButton: React.FC<NumberTwoButtonProps> = ({
    value,
    setValue,
    onChangeText,
    maxLength,
}) => {
    const increase = () => {
        let intText = parseInt(value);
        intText < 20 ? intText++ : intText;
        setValue('' + intText);
    };

    const decrease = () => {
        let intText = parseInt(value);
        intText > 1 ? intText-- : intText;
        setValue('' + intText);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={decrease}
                disabled={parseInt(value) <= 1}>
                <Text style={styles.title}>-</Text>
            </TouchableOpacity>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                maxLength={maxLength}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={increase}
                disabled={parseInt(value) >= 20}>
                <Text style={styles.title}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        margin: 2,
        padding: 8,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 10,
        width: 40,
        textAlign: 'center',
        alignItems: 'center',
    },
    title: {
        color: COLORS.color_white,
        fontSize: 18,
    },
    input: {
        borderWidth: 0.4,
        width: 40,
        textAlign: 'center',
        borderColor: '#fff9',
        borderRadius: 10,
        color: COLORS.color_black,
    },
});

export default NumberTwoButton;
