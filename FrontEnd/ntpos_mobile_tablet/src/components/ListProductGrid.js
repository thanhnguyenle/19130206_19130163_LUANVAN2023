import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  ListView,
} from 'react-native';
import TitleButton from './TitleButton';
import ProductItemPrice from './ProductItemPrice';
const ListProductGrid = props => {
  return (
    <View>
      <TitleButton title={props.title} onPress={props.onPressTitle} />
      <View style={styles.container}>
        {/* <ListView
          nestedScrollEnabled={true}
          data={props.data}
          keyExtractor={(item, index) => 'key' + index}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <ProductItemPrice item={item} navigation={props.navigation} />
            );
          }}
        /> */}
        <View style={styles.app}>
          {props.data.map(item => {
            return (
              <ProductItemPrice
                item={item}
                navigation={props.navigation}
                key={item.id}
              />
            );
          })}
        </View>
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
  app: {
    marginHorizontal: 'auto',
    width: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default ListProductGrid;
