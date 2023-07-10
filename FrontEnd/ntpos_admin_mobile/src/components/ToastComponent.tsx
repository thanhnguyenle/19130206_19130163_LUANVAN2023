import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
    message: string;
    isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (isVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setTimeout(() => {
                hideToast();
            }, 3000);
        } else {
            hideToast();
        }
    }, [isVisible]);

    const hideToast = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        padding: 16,
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    message: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Toast;
