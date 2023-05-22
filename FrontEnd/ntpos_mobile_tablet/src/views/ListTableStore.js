import React from 'react';
import {View, FlatList, Dimensions, StyleSheet, ScrollView} from 'react-native';
import ListTypeTable from '../components/ListTypeTable';
import {Title, Caption, Text} from 'react-native-paper';
import {tables, typeTable} from './data';
import Btn from '../components/Btn';
const ListTableStore = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        data={typeTable}
        renderItem={({item}) => (
          <ListTypeTable data={tables} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ListTableStore;
