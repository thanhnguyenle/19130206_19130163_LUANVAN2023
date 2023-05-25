import { background } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { COLORS } from '../constants/common';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const { width, height } = Dimensions.get('window');
const CustomImageItem = ({ item, index, total }) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={{ uri: item.imgUrl }} />
    </View>
  );
};
const styles = StyleSheet.create({
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
  },
});
export default CustomImageItem;
