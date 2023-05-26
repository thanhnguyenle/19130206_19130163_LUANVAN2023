import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer } from 'mobx-react-lite';
import MyPieChart from './ChartSalesItem';
import OverviewItem from './OverviewItem';
import InventoryItem from './InventoryItem';
import BestsellerItem from './BestsellerItem'

const HomeScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <OverviewItem navigation={navigation} />
                <MyPieChart />
                <BestsellerItem />
                <InventoryItem />
            </ScrollView >
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
export default observer(HomeScreen);