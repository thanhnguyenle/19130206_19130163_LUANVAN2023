import React, { useState } from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';

interface InputComponentProps extends TextInputProps {
    onChangeText: (text: any) => void;
    value: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
                                                           placeholder,
                                                           onChangeText,
                                                           value,
                                                           ...props
                                                       }) => {
    const [text, setText] = useState(value);

    const handleTextChange = (newText: string) => {
        setText(newText);
        onChangeText(newText);
    };

    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={handleTextChange}
            value={text}
            {...props}
        />
    );
};

export default InputComponent;
