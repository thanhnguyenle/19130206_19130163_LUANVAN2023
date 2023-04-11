import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import Btn from '../components/Btn';
import {COLORS} from '../constants/common';
const ProductDetail = ({navigation, route}) => {
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView />
      <View style={styles.groupBottom}>
        <Btn
          title={'Menu'}
          width={'18%'}
          bgColor={COLORS.darkGreen}
          textColor={COLORS.color_white}
          borderRadius={10}
        />
        <Btn title={'Mua ngay'} width={'38%'} />
        <Btn title={'Thêm giỏ hàng'} width={'38%'} />
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
  groupBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
export default ProductDetail;
