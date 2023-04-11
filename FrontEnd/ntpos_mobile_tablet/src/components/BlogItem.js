import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLORS} from '../constants/common';
const BlogItem = ({item}) => {
  const createTwoButtonAlert = () =>
    Alert.alert('Thông báo', 'chỉ test', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
    ]);
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={createTwoButtonAlert}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={{uri: item.imgUrl}} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    width: width - 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    borderRadius: 4,
  },
  containerImage: {
    height: '82%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.color_black,
    fontSize: 16,
    marginTop: 5,
    fontWeight: 600,
    margin: 2,
  },
  star: {
    width: '22%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStar: {
    color: COLORS.color_star,
    fontSize: 12,
    alignItems: 'flex-end',
  },
});
export default BlogItem;
