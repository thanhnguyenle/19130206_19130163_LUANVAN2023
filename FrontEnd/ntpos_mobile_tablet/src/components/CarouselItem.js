import {background} from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS} from '../constants/common';
const {width, height} = Dimensions.get('window');
const CarouselCardItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{uri: item.imgUrl}} />
    </View>
  );
};
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 5,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 0,
    shadowColor: COLORS.color_black,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: width - 20,
    height: height / 5,
  },
});
export default CarouselCardItem;
