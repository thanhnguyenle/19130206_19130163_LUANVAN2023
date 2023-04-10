import React from 'react-native'
import { Text, View, TouchableOpacity } from 'react-native';
export default function TypeApp({ bgImage, title, textColor, onPress, width, borderColor }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderRadius: 20,
                alignItems: 'center',
                width: width,
                borderWidth: 1,
                borderColor: borderColor,
                marginBottom: 10,
                marginTop: 10,
            }}
        >
            <View style={{ padding: 50 }}>
                <Text style={{
                    color: textColor,
                    padding: 10,
                    fontWeight: 'bold',
                    fontSize: 30
                }}>{title}</Text>
            </View>
        </TouchableOpacity>

    );
}