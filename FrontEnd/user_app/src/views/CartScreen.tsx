import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Alert,
} from 'react-native';
import { COLORS } from '../constants/common';
import {Swipeable,  TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {responsiveFontSize, responsiveWidth} from "react-native-responsive-dimensions";
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/AntDesign'
import {useIsFocused} from "@react-navigation/native";
import {calculateTotalPrice, calculateTotalQuantity, formatPrice} from "../utils/function";
import ButtonComponent from "../components/ButtonComponent";
const CartScreen = ({ navigation }: any) => {
    const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number, imageUrl: string }[]>([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            retrieveCartFromAsyncStorage();
        }
    }, [isFocused])
    const retrieveCartFromAsyncStorage = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('carts');
            if (jsonString !== null) {
                const savedCartItems = JSON.parse(jsonString);
                setCartItems(savedCartItems);
                console.log(jsonString)
            }
        } catch (error) {
            console.error('Error retrieving cart from AsyncStorage:', error);
        }
    };
    const removeItemFromCart = async (productId: string) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        const jsonString = JSON.stringify(updatedCartItems);
        const key = 'carts';
        try {
            await AsyncStorage.setItem(key, jsonString);
            console.log('Cart updated after removing item:', jsonString);
        } catch (error) {
            console.error('Error updating cart after removing item:', error);
        }
    };
    const renderRightActions = (id: string) => (
        <TouchableOpacity style={styles.deleteBox} onPress={() => {
            Alert.alert(
                'Cảnh báo',
                'Bạn có muốn xóa sản phẩm này không?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'OK', onPress: async () => {
                            try {
                                removeItemFromCart(id);
                                setTimeout(() => {
                                    Toast.show({
                                        type: 'success',// success, error, info, or any
                                        text1: 'Xóa thành công 👋',
                                        position: 'top',
                                    });
                                }, 1000);
                            } catch (error) {
                                console.error('Delete error:', error);
                                Alert.alert(
                                    'Thông báo',
                                    'Có lỗi xảy ra khi xóa bàn.',
                                );
                            }

                        }
                    }
                ]);
        }}>
            <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                style={{elevation:20}}
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index })=>{
                   return (
                       <Swipeable renderRightActions={() => renderRightActions(item.id)} >
                           <View style={styles.container1}>
                               <TouchableOpacity onPress={() => { navigation.push('DetailProductScreen', { id: item.id }) }}>
                                   <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                       <View style={styles.box1}>
                                          <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                       </View>
                                       <View style={styles.box2}>
                                           <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.54), marginBottom:6 }}>{item.name}</Text>
                                           <Text style={{ color: COLORS.darkGreen, fontWeight: '400', fontSize: responsiveFontSize(2.0) }}>Giá: {formatPrice(item.price)}</Text>
                                       </View>
                                       <View style={styles.box3}>
                                           <Text style={{ color: COLORS.color_black, fontSize: responsiveFontSize(2) , justifyContent:'center'}}>Số lượng: {item.quantity}</Text>
                                       </View>
                                   </View>
                               </TouchableOpacity>
                           </View>
                       </Swipeable>
                   )
                  }
                }
            />
            <View style={{height:80, backgroundColor:COLORS.color_white, elevation:20, alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,flexDirection:'row',gap:20}}>
                  <View style={{gap:10}}>
                      <Text style={{color:COLORS.color_black, fontSize:18}}>Số lượng: {calculateTotalQuantity(cartItems)} món</Text>
                      <View style={{flexDirection:'row', gap:10}}>
                          <Text style={{color:COLORS.color_black, fontSize:20, fontWeight:"700"}}>Tổng tiền:</Text>
                          <Text style={{color:COLORS.darkGreen, fontSize:20, fontWeight:"700"}}>{formatPrice(calculateTotalPrice(cartItems))} đồng</Text>
                      </View>
                  </View>
                <ButtonComponent title={'Đặt ngay'} containerStyle={{backgroundColor:COLORS.darkGreen}} onPress={()=>{navigation.push('SelectTableScreen')}}/>
            </View>
        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
      flex:1,
  },
    container1: {
        textAlign: 'center',
        borderRadius: 5,
        width: '99.1%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        backgroundColor: COLORS.color_white,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff',
    },
    box1: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
    },
    box2: {
        width: responsiveWidth(40),
    },
    box3: {
        width: responsiveWidth(20),
    },
    deleteBox: {
        height: '100%',
        padding: 10,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04d4f',
    }
});
export default CartScreen;
