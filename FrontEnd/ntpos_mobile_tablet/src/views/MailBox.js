import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../constants/common';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Tab, TabView} from '@rneui/themed';
import Icons from 'react-native-vector-icons/Entypo';
const MailBox = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: COLORS.darkGreen,
          height: 2,
        }}
        variant={COLORS.color_white}>
        <Tab.Item
          title="Tin nhắn"
          titleStyle={{fontSize: 16, color: COLORS.darkGreen}}
        />
        <Tab.Item
          title="Thông báo"
          titleStyle={{fontSize: 16, color: COLORS.darkGreen}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%', flex: 1}}>
          <View style={styles.boxChat}>
            <TouchableOpacity style={styles.itemChat}>
              <View style={styles.avatar}>
                <ImageBackground
                  style={styles.imageBg}
                  source={{uri: 'https://i.imgur.com/WCj9ZfH.png'}}
                />
              </View>
              <View style={styles.information}>
                <Text style={{fontSize: 18, color: COLORS.color_black}}>
                  Chat với người bán
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TabView.Item>
        <TabView.Item style={{width: '100%', flex: 1}} />
      </TabView>
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  boxChat: {
    height: height / 8,
    marginTop: 10,
  },
  itemChat: {
    flexDirection: 'row',
    margin: 8,
  },
  avatar: {
    width: 55,
    height: 55,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    elevation: 1.5,
  },
  imageBg: {
    width: '98%',
    height: '98%',
    borderRadius: 50,
  },
  information: {
    marginLeft: 20,
    width: '60%',
    justifyContent: 'center',
  },
});
export default MailBox;
