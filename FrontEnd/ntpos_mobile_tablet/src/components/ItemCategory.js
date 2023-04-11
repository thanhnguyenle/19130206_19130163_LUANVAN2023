import {background} from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../constants/common';
const {width, height} = Dimensions.get('window');
const ItemCategory = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.cardView}>
      <Image style={styles.image} source={{uri: item.imageUrl}} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: 102,
    height: 82,
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: COLORS.color_black,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    elevation: 0.7,
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 70,
    marginBottom: -2,
  },
  itemTitle: {
    color: COLORS.color_black,
    fontSize: 11,
  },
});
export default ItemCategory;
