import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollViewBase, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { ButtonComponent, CheckItemComponent, InputComponent } from "../../components";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FlatList, ScrollView, Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { detailOrder, editTableOrderRequest } from "../../redux_store/orders/ordersSilce";
import { calculateQuality, calculateTotalPrice, formatDateFromNumber } from "../../utils/function";
import { idOrderSuccess } from "../../redux_store/order_return/OrderReturnSlice";
import SelectDropdown from "react-native-select-dropdown";
import IconIcons from "react-native-vector-icons/Ionicons";
import { OrderLineItem } from "../../models/order";
import { fetchProductsNull, fetchProductsStart } from "../../redux_store/product/productSlice";
const EditOrderScreen = ({ navigation }: any) => {
  const [number, setNumber] = useState('1');
  const statusType = ["CREATED", "PAYMENT"];
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order.orderSevice.orderDetail);
  const [status, setStatus] = useState(order.status);
  const products = useSelector((state: RootState) => state.product.productsSevice.products);
  const tables = useSelector((state: RootState) => state.table.tableSevice.data);
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const orderLineItems1 : OrderLineItem[]  = order.orderLineItems.map((item) => ({
    productID: item.productID,
    price: item.price,
    name: item.name,
    quantity: item.quantity,
    discount:0,
  }));
  useEffect(() => {
    dispatch(detailOrder(order.id));
    dispatch(fetchProductsNull());
  }, []);
  const addToCart = (productId: string, name: string, price: number, quantity: number) => {
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
      console.log(updatedCartItems);
    } else {
      const newCartItem = { id: productId, name: name, price: price, quantity: quantity };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      setNumber(1 + '');
    }
  };
  const removeFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };
  const handleEdit = () => {
    dispatch(editTableOrderRequest({
      id:order.id,
      userID:order.userID,
      group:order.group,
      orderDate:order.orderDate,
      status:status,
      note:'demo',
      orderLineItems:orderLineItems1,
      tables:order.tables,
    }));
    console.log(order.orderLineItems)
    navigation.replace('Bill')
  }
  const listItems = order.orderLineItems.map((item) =>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: COLORS.color_white,
      paddingTop: 10,
      paddingBottom: 10,
    }} key={item.productID}>
      <View>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.1) }]}>{item.name}</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, { color: COLORS.darkGreen, fontSize: responsiveFontSize(2) , fontWeight:'500'}]}>{item.price} x {item.quantity}</Text>
      </View>
      <View style={{ alignItems:'flex-end'}}>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>Tổng tiền sản phẩm</Text>
        <Text style={styles.text}></Text>
        <Text style={[styles.text, { color: COLORS.darkGreen, fontSize: responsiveFontSize(2.1), fontWeight:'500',}]}>{item.price * item.quantity}</Text>
      </View>
    </View>
  );
  const listTables = order.tables.map((item) =>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: COLORS.color_white,
      paddingTop: 10,
      paddingBottom: 10,
    }} key={item.tableID}>
      <View>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.3) }]}>{item.name}</Text>
        <Text style={styles.text}>Thời gian bắt đầu</Text>
        <Text style={styles.text}>Thời gian kết thúc</Text>
      </View>
      <View style={{ alignItems:'flex-end'}}>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}></Text>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>{formatDateFromNumber(item.startTime)}</Text>
        <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.0) }]}>{formatDateFromNumber(item.endTime)}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        scrollEnabled={true}>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="user" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Khách lẻ</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>...</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="group" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Nhóm</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{order.group}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.left}>
            <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Thời gian</Text>
          </View>
          <View>
            <Text style={[styles.text,{color: COLORS.color_black}]}>{formatDateFromNumber(order.orderDate)}</Text>
          </View>
        </View>
        <View style={[styles.box, {alignItems:'center'}]}>
          <View style={styles.left}>
            <FontAwesome name="clock-o" size={20} color={COLORS.color_grey} style={{ paddingLeft: 10, paddingRight: 10 }} />
            <Text style={styles.text}>Trạng thái</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={[styles.text,{color: COLORS.color_black, marginRight:10}]}>{status === 'CREATED' ? 'Chưa thanh toán' : 'Đã thanh toán'}</Text>
            <SelectDropdown
              buttonStyle={{backgroundColor:'#ffffff', borderStyle:'solid',borderBottomWidth:1,width:100, height:'auto'}}
              buttonTextStyle={{color:'green', fontSize:12, padding:4}}
              data={statusType}
              onSelect={(selectedValue) => {setStatus(selectedValue); console.log(status)}}
              defaultButtonText={status}
            />
          </View>
        </View>
        <View style={styles.boxListFood}>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10}}>
            <Text style={[styles.text, { fontSize: responsiveFontSize(1.5), color: COLORS.color_grey, marginBottom:10 }]}>Danh sách sản phẩm</Text>
            <TouchableOpacity onPress={()=>{
              if(products.length === 0 ){
                dispatch(fetchProductsStart());
              }
              else{
                dispatch(fetchProductsNull());
              }
            }}><Text style={[styles.text, { fontSize: responsiveFontSize(1.8), color: COLORS.darkGreen, marginBottom:10, fontWeight:'600' }]}>Chọn thêm món</Text></TouchableOpacity>
          </View>
          {
            products.length !== 0 ?
            <View style={styles.boxContent}>
              <Text style={{ fontSize: 20, color: COLORS.color_black, fontWeight: '500' }}>Chọn món</Text>
              <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                {products.map((item) => (
                  <ProductItem key={item.id} item={item} number={number} setNumber={setNumber} addToCart={addToCart} />
                ))}
              </View>
            </View>
              : null
          }
          {listItems}
        </View>
        <View style={styles.boxListFood}>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:10}}>
           <Text style={[styles.text, { fontSize: responsiveFontSize(1.5), color: COLORS.color_grey, marginBottom:10, marginLeft:10  }]}>Danh sách bàn</Text>
          </View>
          {listTables}
        </View>
        <View style={styles.boxListFood}>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng số lượng sản phẩm</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {calculateQuality(order.orderLineItems)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền phải trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {calculateTotalPrice(order.orderLineItems)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng cần trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{calculateTotalPrice(order.orderLineItems)}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng đã trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{order.status === 'CREATED' ? 0 : calculateTotalPrice(order.orderLineItems)}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', flex: 1, marginTop: 20, marginBottom: 30, }}>
          <ButtonComponent title='Cập nhật' onPress={handleEdit} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View>
      </ScrollView >
    </View >
  );
}
const ProductItem = ({ item, number, setNumber, addToCart }: any) => {
  return (
    <View style={styles.container1}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.box1}>
          {item.images.length > 0 ? (
            <Image
              source={{ uri: item.images[0].url }}
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
            />
          ) : (
            <Image
              source={require('../../assets/imageDefauProduct.png')}
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
            />
          )}
        </View>
        <View style={styles.box2}>
          <Text style={{ color: COLORS.color_black, fontWeight: '500', fontSize: responsiveFontSize(2.4), marginBottom: 10 }}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.darkGreen, fontWeight: '600', fontSize: responsiveFontSize(2.1) }}>{item.price}đ</Text>
        </View>
        <View style={styles.box3}>
          <Text style={{ color: COLORS.color_black, fontWeight: '400', fontSize: responsiveFontSize(1.6), marginBottom: 10 }}>Số lượng</Text>
          <InputComponent
            value={number + ''}
            onChangeText={setNumber}
            placeholder=''
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 20,
              borderBottomColor: COLORS.bgGreen,
              backgroundColor: '#F5F5F5',
              width: 30,
            }}
          />
        </View>
        <View style={styles.box4}>
          <TouchableOpacity
            style={{ backgroundColor: COLORS.darkGreen, borderRadius: 30, width: '50%', alignItems: 'center' }}
            onPress={() => addToCart(item.id, item.name, item.price, parseInt(number, 10))}
          >
            <IconIcons name='add' size={30} color={COLORS.color_white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    marginBottom:10,
  },
  boxContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  box: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: COLORS.color_white,
    borderBottomWidth: 0.5,
    borderColor: COLORS.color_grey_seconds,
    justifyContent: 'space-between',
  },
  box1: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    marginRight: 10,
  },
  box2: {
    width: responsiveWidth(30),
  },
  box3: {
    width: responsiveWidth(24),
  },
  box4: {
    width: responsiveWidth(20),
    textAlign: 'center'
  },
  text: {
    color: COLORS.color_grey,
    fontSize: responsiveFontSize(2),
  },
  left: {
    flexDirection: 'row'
  },
  boxListFood: {
    marginTop: 10,
  }
});
export default EditOrderScreen;
