import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { navigateToAdmin, navigateToLogin } from '../../redux_store/navigation/navigationSlice';

const SplashScreen = () => {
    const [animating, setAnimating] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            AsyncStorage.getItem('accessToken').then(value =>
                value === null ? dispatch(navigateToLogin()) : dispatch(navigateToAdmin())
            );
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.jpg')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <ActivityIndicator
                animating={animating}
                color={COLORS.color_seconds}
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.color_white,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
