import React, { useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { detailReceiptOrderRequest } from "../../redux_store/payment/PaymentSlice";
import { detailPaySlipOrder } from "../../redux_store/order_return/OrderReturnSlice";
import { formatPrice, shortenOrderID } from "../../utils/function";
const DetailPaySlipOrderScreen = ({ navigation, route }: any) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const paySlipOrder = useSelector((state: RootState) => state.orderReturn.orderReturnService.paySlipOrder);
  useEffect(() => {
    dispatch(detailPaySlipOrder(id));
    console.log(id);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        scrollEnabled={true}>
        <View style={styles.boxListFood}>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Hóa đơn</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {shortenOrderID(paySlipOrder.id)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Mô tả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {paySlipOrder.description}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Tổng tiền phải trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>
              {formatPrice(paySlipOrder.totalReturn)}
            </Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng cần trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{formatPrice(paySlipOrder.total)}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.left}>
              <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.color_black }]}>Khách hàng đã trả</Text>
            </View>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2.2), color: COLORS.darkGreen, fontWeight: '500' }]}>{formatPrice(paySlipOrder.totalReceive)}</Text>
          </View>
        </View>
      </ScrollView >
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:10,
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
export default DetailPaySlipOrderScreen;
