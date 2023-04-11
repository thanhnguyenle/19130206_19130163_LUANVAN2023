import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import SearchBar from '../components/Search';
import {COLORS} from '../constants/common';
const SearchScreen = ({navigation}) => {
  const [valueSearch, setValueSearch] = useState();
  function updateSearch(value) {
    console.log(value);
  }
  const keyWords = [
    {key: 'Nướng'},
    {key: 'Lẩu'},
    {key: 'Hải sản'},
    {key: 'Cơm'},
  ];
  return (
    <View>
      <SafeAreaView>
        <SearchBar
          isEnter={true}
          navigation={navigation}
          value={valueSearch}
          updateSearch={updateSearch}
          style={{marginTop: '4%'}}
        />
        <Text
          style={{
            marginLeft: 10,
            color: COLORS.color_black,
            fontWeight: '500',
          }}>
          Từ khóa
        </Text>
        <View>
          <FlatList
            nestedScrollEnabled
            data={keyWords}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.itemHistory}>
                <Text style={{fontSize: 16, color: 'grey'}}>{item.key}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default SearchScreen;
const styles = StyleSheet.create({
  itemHistory: {
    paddingTop: 10,
    paddingLeft: 20,
  },
});
