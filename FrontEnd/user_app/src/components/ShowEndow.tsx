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

interface ShowEndowProps {
  title: string;
  onPressDeteil: () => void;
  data: any[];
  navigation: any;
}

const ShowEndow: React.FC<ShowEndowProps> = ({
  title,
  onPressDeteil,
  data,
  navigation,
}) => {
  return (
    <View>
      {title === '' ? (
        <></>
      ) : (
        <TitleButton title={title} onPress={onPressDeteil} />
      )}
      <View style={styles.container}>
        <FlatList
          nestedScrollEnabled={true}
          data={data}
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
              <ProductItem navigation={navigation} item={item} />
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
