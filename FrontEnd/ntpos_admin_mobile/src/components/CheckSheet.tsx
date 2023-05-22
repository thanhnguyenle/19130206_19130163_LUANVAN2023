import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle, View, Image, ImageBackground } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../constants/common';
interface CheckSheet {
    idCheckSheet: string;
    datetimeStart: string;
    datetimeEnd: string;
    operation: string;
}
interface CheckSheetProps {
    checkSheet: CheckSheet;
    onPress: () => void;
    containerStyle?: ViewStyle;
}
const CheckSheetComponent: React.FC<CheckSheetProps> = ({ checkSheet, onPress, containerStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.box1}>
                    <Image source={require('../assets/checkSheet.png')} style={{ flex: 1, resizeMode: 'stretch', width: '100%', height: '100%', borderRadius: 10 }} />
                </View>
                <View style={styles.box2}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{checkSheet.idCheckSheet}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{checkSheet.datetimeStart}</Text>
                </View>
                <View style={styles.box3}>
                    <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(2.1) }}>{checkSheet.operation}</Text>
                    <Text style={{ color: COLORS.color_grey, fontSize: responsiveFontSize(1.8) }}>{checkSheet.datetimeEnd}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        backgroundColor: COLORS.color_white,
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
    box1: {
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        alignItems: 'center'
    },
    box2: {
        width: responsiveWidth(38),
    },
    box3: {
        width: responsiveWidth(38),
    }
});

export default CheckSheetComponent;
