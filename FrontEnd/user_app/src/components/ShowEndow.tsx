import React from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ProductItem from './ProductItem';
import TitleButton from './TitleButton';

const ShowEndow = (props: {
  title: string;
  onPressDeteil: () => void;
  data: any[];
  navigation: any;
}) => {
  return (
    <View>
      {props.title === '' ? (
        <></>
      ) : (
        <TitleButton title={props.title} onPress={props.onPressDeteil} />
      )}
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          data={props.data}
          keyExtractor={(item, index) => 'key' + index}
          pagingEnabled
          scrollEnabled
          horizontal={true}
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem navigation={props.navigation} item={item} />
            );
          }}
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 3.5,
    marginBottom: 10,
  },
});

export default ShowEndow;
