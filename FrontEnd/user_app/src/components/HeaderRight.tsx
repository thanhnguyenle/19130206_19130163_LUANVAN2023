import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/common';

const HeaderRight = ({ navigation }: any) => {
    return (
        <View style={styles.iconContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ChatBox');
                }}
            >
                <Iconicons
                    name="chatbox"
                    size={25}
                    color={COLORS.color_white}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ChatBox');
                }}
            >
                <Iconicons
                    name="notifications"
                    size={25}
                    color={COLORS.color_white}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        paddingLeft: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 90,
    },
});

export default HeaderRight;
