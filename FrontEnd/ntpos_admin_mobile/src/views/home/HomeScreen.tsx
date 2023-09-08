import React, { FC, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
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
import { fetchProductsBestsellerStart, fetchProductsStart } from "../../redux_store/product/productSlice";
import { COLORS } from "../../constants/common";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  calculateTotalCost,
  calculateTotalCostOrder,
  calculateTotalQuatiProducts,
  formatPrice
} from "../../utils/function";
import { PieChart } from "react-native-chart-kit";
import homeStore from "../../store/HomeStore";
import { requestMaterialsAll } from "../../redux_store/cancellation/CancellationSlice";
import { fetchReceiptOrdersStart } from "../../redux_store/payment/PaymentSlice";
import { fetchOrdersStart } from "../../redux_store/orders/ordersSilce";
type Data = {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
};

type ChartConfig = {
  backgroundColor: string;
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity: number) => string;
};
const chartConfig: ChartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
};
const HomeScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const productBestseller = useSelector((state: RootState) => state.product.productsSevice.productsBestseller);
    const listMaterialsAll = useSelector((state: RootState) => state.inventory.cancellationService.listMaterialAll);
    const orders = useSelector((state: RootState) => state.order.orderSevice.orders);
    const filteredOrders = orders.filter(order => order.status === "PAYMENT");
    const receiptOrders = useSelector((state: RootState) => state.payment.paymentReturnService.listReceiptOrder);
    const products = useSelector((state: RootState) => state.product.productsSevice.products);
    useEffect(() => {
      dispatch(fetchProductsBestsellerStart());
      dispatch(fetchReceiptOrdersStart());
      dispatch(fetchOrdersStart());
      dispatch(requestMaterialsAll());
      dispatch(fetchProductsStart());
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
  const initialData: Data[] = [
    {
      name: 'Nguyên liệu',
      population: calculateTotalCost(listMaterialsAll),
      color: '#FFCD5680',
      legendFontColor: '#000',
      legendFontSize:10,
    },
    {
      name: 'Tổng doanh thu',
      population: calculateTotalCostOrder(filteredOrders),
      color: '#FF638470',
      legendFontColor: '#000',
      legendFontSize:10,
    },
  ];
    return (
        <View style={styles.container}>
            <ScrollView>
                <OverviewItem navigation={navigation} />
              <View style={styles.revenue}>
                <View style={styles.boxTitle}>
                  <Text style={styles.title}>Thống kê</Text>
                  <TouchableOpacity onPress={()=>{}}>
                    <Text>Cập nhật</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 6, marginRight: 6 }}>
                  <PieChart
                    data={initialData}
                    width={responsiveWidth(90)}
                    height={responsiveHeight(30)}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    absolute
                  />
                </View>
              </View>
              <View style={styles.inventory}>
                  <View style={styles.boxTitle}>
                    <Text style={styles.title}>Hàng bán chạy nhất</Text>
                    <TouchableOpacity onPress={() => {  dispatch(fetchProductsBestsellerStart()) }}>
                      <Text>Cập nhật</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.box1}>
                    <FlatList
                      style={{ flex: 1 }}
                      data={productBestseller}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.itemBox1}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>Phần trăm : {item.percent}</Text>
                          </View>
                        );
                      }}
                      ItemSeparatorComponent={() => {
                        return <View style={{ width: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>;
                      }}
                      horizontal={true} // Hiển thị theo chiều ngang
                      initialNumToRender={2} // Hiển thị 2 phần tử đầu tiên
                    />
                  </View>
                </View>
              <View style={styles.inventory}>
                <View style={styles.boxTitle}>
                  <Text style={styles.title}>Tồn kho</Text>
                  <TouchableOpacity onPress={() => { homeStore.updateInventory() }}>
                    <Text>Cập nhật</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.box1}>
                  <View style={[styles.itemBox1, { backgroundColor: '#e0e0eb90' }]}>
                    <Text style={styles.text}>Tổng tiền NL: {calculateTotalCost(listMaterialsAll)}</Text>
                  </View>
                  <View style={[styles.itemBox1, { backgroundColor: '#e0e0eb90' }]}>
                    <Text style={styles.text}>Số lượng HH :{calculateTotalQuatiProducts(products)}</Text>
                  </View>
                </View>
              </View>
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
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    alignItems: 'center'
  },
  inventory: {
    marginTop: 10,
    backgroundColor: COLORS.color_white,
    marginBottom: 5,
    elevation: 1,
    marginLeft: 1,
    marginRight: 1,

  },
  revenue: {
    marginTop: 10,
    backgroundColor: COLORS.color_white,
    marginBottom: 5,
    elevation: 1,
    marginLeft: 1,
    marginRight: 1,
  },
  box1: {
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    backgroundColor: COLORS.color_white,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: -(10 / 2),
    marginHorizontal: -(10 / 2),
    marginBottom: 10,
  },
  title: {
    fontSize: responsiveFontSize(3),
    elevation: 1,
    color: COLORS.color_black,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  itemBox1: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 2,
    backgroundColor: '#ccffe690',
    height: responsiveHeight(12),
    width: responsiveWidth(50 - 3),
  },
  text: {
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    color: COLORS.color_black
  },
})
export default observer(HomeScreen);
