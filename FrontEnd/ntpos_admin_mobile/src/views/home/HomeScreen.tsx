import React, { FC, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { observer } from 'mobx-react-lite';
import MyPieChart from './ChartSalesItem';
import OverviewItem from './OverviewItem';
import InventoryItem from './InventoryItem';
import BestsellerItem from './BestsellerItem'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigateToAdmin, navigateToLogin } from "../../redux_store/navigation/navigationSlice";
import { requestReadUser } from "../../redux_store/auth/authSlice";

const HomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
              AsyncStorage.getItem('accessToken').then(value =>{
                    if (value != null) {
                        dispatch(requestReadUser(value));
                    }
                }
              );
          }, 1000
        );
    }, []);
    return (
        <View style={styles.container}>
            <ScrollView>
                <OverviewItem navigation={navigation} />
                <MyPieChart />
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
