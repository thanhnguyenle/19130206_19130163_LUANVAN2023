import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const ButtonComponent: React.FC<ButtonProps> = ({ title, onPress, containerStyle, titleStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: '#007aff',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
});

export default ButtonComponent;
