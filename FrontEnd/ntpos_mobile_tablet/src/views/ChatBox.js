import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {COLORS} from '../constants/common';
import ItemOrder from '../components/ItemOrder';
import Icons from 'react-native-vector-icons/Entypo';
import {orders} from './data';
import ListChat from '../components/chat/ListChat';
const ChatBox = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ListChat />
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    backgroundColor: 'red',
  },
  fifterCard: {
    marginTop: 2,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 6,
    backgroundColor: COLORS.color_white,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: '#00000090',
  },
  listOrder: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
  },
  text: {
    color: COLORS.color_black,
    padding: 1,
    fontSize: 16,
  },
});
export default ChatBox;
