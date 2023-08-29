import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Alert, FlatList} from 'react-native';
import { blogs, carousels, categorys, products } from '../constants/data';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/carousel/Carousel';
import CarouseCategory from '../components/carousel/CarouseCategory';
import ShowEndow from '../components/ShowEndow';
import ListBlog from '../components/ListBlog';
import ListProductGrid from '../components/ListProductGrid';
import HeaderRight from '../components/HeaderRight';
import {useDispatch, useSelector} from "react-redux";
import {requestListCategory} from "../redux/product/category/CategorySlice";
import {RootState} from "../app/store";
import {fetchProductsStart} from "../redux/product/product1/ProductSlice";
import ProductItem from "../components/ProductItem";
import TitleButton from "../components/TitleButton";
import ProductItemPrice from "../components/ProductItemPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {requestReadUser} from "../redux/auth/loginSlice";
interface Props {
    navigation: any;
  }
  const HomeScreen: React.FC<Props> = ({ navigation }) => {
      const dispatch = useDispatch();
      const category = useSelector((state: RootState) => state.product.categorys.categorys);
      const product = useSelector((state: RootState) => state.product.products.products);
      useEffect(() => {
      dispatch(requestListCategory());
      dispatch(fetchProductsStart());
      clearCart();
      }, []);
      const clearCart = async () => {
          try {
              await AsyncStorage.removeItem('carts');
              console.log('Cart cleared from AsyncStorage');
          } catch (error) {
              console.error('Error clearing cart from AsyncStorage:', error);
          }
      };
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => <HeaderRight navigation={navigation} />,
        });
      }, [navigation]);
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
                <SearchBar
                    isEnter={false}
                    navigation={navigation}
                    style={{ marginTop: '4%' }}
                    updateSearch={() => { }}
                    value=''
                />
                <Carousel data={carousels} />
                <CarouseCategory data={category} />
                <View style={styles.container}>
                    <TitleButton title={'Ưu đãi hot'} onPress={()=>{}} />
                    <FlatList
                        nestedScrollEnabled={true}
                        data={product.slice(5)}
                        keyExtractor={(item, index) => 'key' + index}
                        pagingEnabled
                        scrollEnabled
                        horizontal={true}
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ProductItem navigation={navigation} item={item} />
                            );
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <TitleButton title={'Món mới'} onPress={()=>{}} />
                    <FlatList
                        nestedScrollEnabled={true}
                        data={product.slice(-15)}
                        keyExtractor={(item, index) => 'key' + index}
                        pagingEnabled
                        scrollEnabled
                        horizontal={true}
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ProductItem navigation={navigation} item={item} />
                            );
                        }}
                    />
                </View>
                <View>
                    <TitleButton title={'Tất cả'} onPress={()=>{}} />
                    <View style={styles.container}>
                        <View style={styles.app}>
                            {product.map((item) => (
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    },
    app: {
        marginHorizontal: 'auto',
        width: 400,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default HomeScreen;
