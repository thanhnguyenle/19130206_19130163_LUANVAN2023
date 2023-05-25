import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/common';
import Iconicons from 'react-native-vector-icons/Ionicons';

interface TitleButtonProps {
    title: string;
    onPress: () => void;
}

const TitleButton: React.FC<TitleButtonProps> = ({ title, onPress }) => {
    return (
        <View style={styles.titleView}>
            <TouchableOpacity onPress={onPress} style={{ width: '90%' }}>
                <Text style={styles.itemTitle}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={{ width: '10%' }}>
                <Iconicons name={'arrow-forward'} size={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
    },
    itemTitle: {
        fontSize: 20,
        color: COLORS.color_black,
        fontWeight: '500',
    },
});

export default TitleButton;
