import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    FlatList, Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { COLORS } from '../constants/common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { carousels} from '../constants/data';
import ButtonComponent from '../components/ButtonComponent';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {fetchProductRequest} from "../redux/product/product1/ProductSlice";
import ProductItemPrice from "../components/ProductItemPrice";
import TitleButton from "../components/TitleButton";
import {OrderLineItem} from "../model/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {formatPrice} from "../utils/function";

interface ProductDetailProps {
    navigation: any;
    route: any;
}
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}
const ProductDetail: React.FC<ProductDetailProps> = ({ navigation, route }) => {
    const { id } = route.params;
    const [counter, setCounter] = useState(1);
    const product = useSelector((state: RootState) => state.product.products.product);
    const products = useSelector((state: RootState) => state.product.products.products);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [number, setNumber] = useState('1');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductRequest(id));
        readCartItemsFromAsyncStorage().then((currentCartItems) => {
            setCartItems(currentCartItems);
            console.log(cartItems)
        });
    }, []);
    const readCartItemsFromAsyncStorage = async (): Promise<CartItem[]> => {
        try {
            const jsonString = await AsyncStorage.getItem('carts');
            if (jsonString !== null) {
                const currentCartItems:CartItem[] = JSON.parse(jsonString);
                return currentCartItems;
            }
        } catch (error) {
            console.error('Error reading cart items from AsyncStorage:', error);
        }
        return [];
    };
    const handleScroll = (event: any) => {
        let xOffset = event.nativeEvent.contentOffset.x;
        let contentWidth = event.nativeEvent.contentSize.width;
        let value = (xOffset / contentWidth) * carousels.length;
        setCounter(Math.round(value) + 1);
    };
    const addToCart = async(productId: string, name: string, price: number, quantity: number, imageUrl : string) =>  {
        const existingCartItem = cartItems.find((item) => item.id === productId);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: item.quantity + quantity };
                } else {
                    return item;
                }
            });
            setCartItems(updatedCartItems);
            setNumber(1 + '');
            const jsonString = JSON.stringify(cartItems);
            const key = 'carts';
            try {
                await AsyncStorage.setItem(key, jsonString);
                console.log('Cart saved to AsyncStorage:', jsonString);
            } catch (error) {
                console.error('Error saving cart to AsyncStorage:', error);
            }
        } else {
            const newCartItem = { id: productId, name: name, price: price, quantity: quantity, imageUrl : imageUrl };
            setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
            setNumber(1 + '');
            const updatedCartItems = [...cartItems, newCartItem];
            const jsonString = JSON.stringify(updatedCartItems);
            const key = 'carts';
            try {
                await AsyncStorage.setItem(key, jsonString);
                console.log('Cart saved to AsyncStorage:', jsonString);
            } catch (error) {
                console.error('Error saving cart to AsyncStorage:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    {/* IMAGE OF PRODUCT  */}
                    <FlatList
                        onScroll={handleScroll}
                        nestedScrollEnabled={true}
                        data={product.images}
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
                                <View style={styles.cardView}>
                                    { product.images.length > 0? <Image style={styles.image} source={{ uri: item.url }} /> : <Text>No Image Available</Text>}
                                </View>
                            );
                        }}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.imageText}>
                            {counter}/{product.images.length}
                        </Text>
                    </View>
                </SafeAreaView>
                <View style={styles.titlePanel}>
                    <Text style={styles.title}>{product.name}</Text>
                </View>
                <View style={styles.titlePanel}>
                    <Text style={styles.titlePrice}>Giá: {formatPrice(product.price)}</Text>
                </View>
                <View style={styles.titlePanel}>
                    <Text style={[styles.title,{color:COLORS.color_grey, fontSize: 18, fontWeight: '400'}]}>{product.description == '' ? '...' :  product.description}</Text>
                </View>
                <View style={{borderWidth:0.4,borderColor: COLORS.color_grey_seconds, marginVertical:20 }}></View>
                <View>
                    <TitleButton title={'Món ăn khác'} onPress={()=>{}} />
                    <View style={styles.container}>
                        <View style={styles.app}>
                            {products.map((item) => (
                                <ProductItemPrice
                                    item={item}
                                    navigation={navigation}
                                    key={item.id}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.groupBottom}>
                <ButtonComponent title={'Menu'} containerStyle={{backgroundColor:COLORS.darkGreen}} onPress={() => {navigation.push('ListProductsScreen') }} />
                <ButtonComponent title={'Thêm giỏ hàng'}  containerStyle={{backgroundColor:COLORS.darkGreen}} onPress={() => addToCart(product.id, product.name, product.price, parseInt(number, 10), product.images[0].url)} />
            </View>
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    app: {
        marginHorizontal: 'auto',
        width: 400,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardView: {
        position: 'relative',
        flex: 1,
        width: width - 5,
        height: height / 2,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 0,
        shadowColor: COLORS.color_black,
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: width - 5,
        height: height / 2,
        resizeMode:'contain',
        backgroundColor:COLORS.color_white
    },
    titlePanel: {
        color: COLORS.color_black,
        margin: 5,
        marginLeft: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.color_black,
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
