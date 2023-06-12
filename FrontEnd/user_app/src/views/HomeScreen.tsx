import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Alert} from 'react-native';
import { blogs, carousels, categorys, products } from '../constants/data';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/carousel/Carousel';
import HeaderRight from '../components/HeaderRight';
import CarouseCategory from '../components/carousel/CarouseCategory';
import ShowEndow from '../components/ShowEndow';
import ListBlog from '../components/ListBlog';
import ListProductGrid from '../components/ListProductGrid';

const HomeScreen: React.FC<any> = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight navigation={navigation} />,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchBar
                    isEnter={false}
                    navigation={navigation}
                    style={{ marginTop: '4%' }}
                    updateSearch={() => { }}
                    value=''
                />
                <Carousel data={carousels} />
                <CarouseCategory data={categorys[0].list} />
                <ShowEndow
                    title={'Ưu đãi hot'}
                    onPressDeteil={() => {
                        Alert.alert('demo');
                    }}
                    data={products}
                    navigation={navigation}
                />
                <ShowEndow
                    title={'Món mới'}
                    onPressDeteil={() => {
                        Alert.alert('demo');
                    }}
                    data={products}
                    navigation={navigation}
                />
                <ListBlog
                    listBlog={blogs}
                    onPressTitle={() => {
                        Alert.alert('listB');
                    }}
                    navigation={navigation}
                />
                <ListProductGrid
                    data={products}
                    title={'Tất cả'}
                    onPressTitle={() => {
                        Alert.alert('All');
                    }}
                    navigation={navigation}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    },
});

export default HomeScreen;
