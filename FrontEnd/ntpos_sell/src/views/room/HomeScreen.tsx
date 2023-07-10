import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const HomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View >

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    char: {
        marginLeft: 1,
        marginRight: 1,
        width: responsiveWidth(100),
        height: responsiveHeight(35),
    },

})
export default HomeScreen;