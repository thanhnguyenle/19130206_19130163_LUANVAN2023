import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import { COLORS } from '../constants/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShowEndow from '../components/ShowEndow';
import { carousels, products } from '../constants/data';
import CustomImageItem from '../components/CustomImageItem';
import ButtonComponent from '../components/ButtonComponent';

interface ProductDetailProps {
    navigation: any;
    route: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ navigation, route }) => {
    const { product } = route.params;
    const [counter, setCounter] = useState(1);
    const handleScroll = (event: any) => {
        let xOffset = event.nativeEvent.contentOffset.x;
        let contentWidth = event.nativeEvent.contentSize.width;
        let value = (xOffset / contentWidth) * carousels.length;
        setCounter(Math.round(value) + 1);
    };
    const onViewableItemsChanged = ({ viewableItems, changed }: any) => {
        console.log('Visible items are', viewableItems);
        console.log('Changed in this iteration', changed);
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    {/* IMAGE OF PRODUCT  */}
                    <FlatList
                        onScroll={handleScroll}
                        nestedScrollEnabled={true}
                        data={carousels}
                        keyExtractor={(item, index) => 'key' + index}
                        pagingEnabled
                        scrollEnabled
                        horizontal={true}
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <CustomImageItem
                                    item={item}
                                    index={index}
                                    total={carousels.length}
                                />
                            );
                        }}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.imageText}>
                            {counter}/{carousels.length}
                        </Text>
                    </View>
                </SafeAreaView>
                {/* TITLE */}
                <View style={styles.titlePanel}>
                    <Text style={styles.title}>{product.name}</Text>
                </View>
                {/* PRICE */}
                <View style={styles.titlePanel}>
                    <Text style={styles.titlePrice}>đ{product.price}</Text>
                </View>
                {/* DISCOUNT */}
                <View style={styles.titlePanel}>
                    <Text style={styles.title}>Ưu đãi</Text>
                </View>
                <ShowEndow
                    title={''}
                    onPressDeteil={() => {
                        alert('demo');
                    }}
                    data={products}
                    navigation={navigation}
                />

                {/* DESCRIPTION */}
                <View style={styles.titlePanel}>
                    <Text style={styles.title}>Mô tả</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>{product.description}</Text>
                </View>
                {/* COMMENT */}
                <View>
                    {/* <ListCommand /> */}
                </View>
            </ScrollView>
            <View style={styles.groupBottom}>
                <ButtonComponent title={'Menu'} onPress={() => { }} />
                <ButtonComponent title={'Mua ngay'} onPress={() => { }} />
                <ButtonComponent title={'Thêm giỏ hàng'} onPress={() => { }} />
            </View>
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    titlePanel: {
        color: COLORS.color_black,
        margin: 5,
        marginLeft: 15,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: COLORS.color_grey,
    },
    titlePrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.color_primary,
    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.color_grey,
        borderRadius: 10,
        padding: 5,
        opacity: 0.8,
        margin: 10,
    },
    imageText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    groupBottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    description: {
        margin: 5,
        marginLeft: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: COLORS.color_black,
    },
});

export default ProductDetail;