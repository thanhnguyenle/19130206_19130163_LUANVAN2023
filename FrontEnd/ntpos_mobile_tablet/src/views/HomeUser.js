import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/Search';
import {blogs, carousels, categorys, products} from './data';
import Carousel from '../components/Carousel';
import CarouseCategory from '../components/CarouseCategory';
import ShowEndow from '../components/ShowEndow';
import ListBlog from '../components/ListBlog';
import ListProductGrid from '../components/ListProductGrid';
const HomeUser = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar
          isEnter={false}
          navigation={navigation}
          style={{marginTop: '4%'}}
        />
        <Carousel data={carousels} />
        <CarouseCategory data={categorys[0].list} />
        <ShowEndow
          title={'Ưu đãi hot'}
          onPressDeteil={() => {
            alert('demo');
          }}
          data={products}
          navigation={navigation}
        />
        <ShowEndow
          title={'Món mới'}
          onPressDeteil={() => {
            alert('demo');
          }}
          data={products}
          navigation={navigation}
        />
        <ListBlog
          listBlog={blogs}
          onPressTitle={() => {
            alert('listB');
          }}
          navigation={navigation}
        />
        <ListProductGrid
          data={products}
          title={'Tất cả'}
          onPressTitle={() => {
            alert('All');
          }}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
});
export default HomeUser;
