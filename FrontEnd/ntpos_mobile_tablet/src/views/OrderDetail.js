import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants/common';
import Btn from '../components/Btn';
const OrderDetail = ({navigation, route}) => {
  const {order} = route.params;
  function stringStatus(status) {
    if (status == 1) {
      return 'Đã hoàn thành';
    } else if (status == 2) {
      return 'Chưa hoàn thành';
    } else if (status == 3) {
      return 'Đã hủy';
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.boxStatus}>
          <View style={styles.itemStatus}>
            <Icons
              name="downcircleo"
              size={22}
              style={{color: COLORS.darkGreen}}
            />
            <Text style={{color: COLORS.color_black, marginTop: 10}}>
              Chờ xác nhận
            </Text>
          </View>
          <View style={styles.icon}>
            <Icons name="minus" size={22} style={{color: COLORS.color_grey}} />
          </View>
          <View style={styles.itemStatus}>
            <Icons
              name="downcircleo"
              size={22}
              style={{color: COLORS.darkGreen}}
            />
            <Text style={{color: COLORS.color_black, marginTop: 10}}>
              Đã xác nhận
            </Text>
          </View>
          <View style={styles.icon}>
            <Icons name="minus" size={22} style={{color: COLORS.color_grey}} />
          </View>
          <View style={styles.itemStatus}>
            <Icons
              name="downcircleo"
              size={22}
              style={{color: COLORS.darkGreen}}
            />
            <Text style={{color: COLORS.color_black, marginTop: 10}}>
              Đã hoàn thành
            </Text>
          </View>
        </View>
        <View style={styles.boxTextStatus}>
          <Text style={styles.titleStatus}>{stringStatus(order.status)}</Text>
        </View>
        <View style={styles.information}>
          <Text style={styles.subTitle}>ID: {order.id}</Text>
          <TouchableOpacity
            style={[styles.buttonItem, {backgroundColor: '#097ebd'}]}>
            <Text style={{color: COLORS.color_white}}>Liên hệ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.informationDetail}>
          <Text style={styles.subTitleDetail}>
            Khách hàng: null+ 0365448301
          </Text>
          <Text style={styles.subTitleDetail}>Bàn :{order.idTable}</Text>
          <Text style={styles.subTitleDetail}>
            Số lượng người :{order.memberNumber}
          </Text>
          <Text style={styles.subTitleDetail}>
            Số lượng người :{order.time}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'row',
          marginBottom: 30,
        }}>
        <Btn
          width="80%"
          bgColor={COLORS.darkGreen}
          borderColor={COLORS.darkGreen}
          textColor={COLORS.color_white}
          title={'Đặt lại'}
          fontSize={20}
        />
      </View>
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxStatus: {
    flexDirection: 'row',
    height: height / 8,
    justifyContent: 'center',
  },
  itemStatus: {
    flexDirection: 'column',
    width: '25%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  icon: {
    width: '10%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxTextStatus: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStatus: {
    fontSize: 30,
    fontWeight: '600',
    color: COLORS.darkGreen,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 30,
  },
  buttonItem: {
    backgroundColor: 'red',
    marginTop: 2,
    marginBottom: 2,
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  subTitle: {
    fontSize: 20,
    color: '#000000',
  },
  informationDetail: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  subTitleDetail: {
    fontSize: 18,
    color: '#00000090',
    marginTop: 10,
  },
});
export default OrderDetail;
