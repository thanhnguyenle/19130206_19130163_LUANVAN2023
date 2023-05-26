import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ItemNotification } from '../../components';
import notificationStore from '../../store/NotificationStore';
const NotificationScreen = () => {
    notificationStore.loadData();
    return (
        <View style={styles.container}>
            <FlatList
                data={notificationStore.listData}
                renderItem={({ item }) => (
                    <ItemNotification username={item.username} content={item.content} time={item.time} onPress={() => { }} />
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },


})
export default NotificationScreen;