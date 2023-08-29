import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { COLORS } from "../../constants/common";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import navigation from "../../reducer/navigation";

const MailboxScreen = ({navigation}: any) => {
    return (
        <SafeAreaView style={styles.container}>
              <ScrollView >
                 <TouchableOpacity onPress={()=>{navigation.push('DetailChatScreen')}} style={styles.itemChat}>
                   <View style={[styles.itemChatImage, {marginLeft:20}]}>
                     <Image source={{uri:'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',}} style={styles.imageStyle}/>
                   </View>
                   <View>
                     <Text style={styles.nameTitle}>Dương Minh Như</Text>
                     <Text style={styles.mess}>Hi shop</Text>
                   </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{navigation.push('DetailChatScreen')}} style={styles.itemChat}>
                  <View style={[styles.itemChatImage, {marginLeft:20}]}>
                    <Image source={{uri:'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',}} style={styles.imageStyle}/>
                  </View>
                  <View>
                    <Text style={styles.nameTitle}>Dương Minh Như</Text>
                    <Text style={styles.mess}>Hi shop</Text>
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{navigation.push('DetailChatScreen')}} style={styles.itemChat}>
                  <View style={[styles.itemChatImage, {marginLeft:20}]}>
                    <Image source={{uri:'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',}} style={styles.imageStyle}/>
                  </View>
                  <View>
                    <Text style={styles.nameTitle}>Dương Minh Như</Text>
                    <Text style={styles.mess}>Hi shop</Text>
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{navigation.push('DetailChatScreen')}} style={styles.itemChat}>
                  <View style={[styles.itemChatImage, {marginLeft:20}]}>
                    <Image source={{uri:'https://oca.edu.vn/uploads/images/info/doraemon-trong-tieng-trung-la-gi.png',}} style={styles.imageStyle}/>
                  </View>
                  <View>
                    <Text style={styles.nameTitle}>Dương Minh Như</Text>
                    <Text style={styles.mess}>Hi shop</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
   flex:1,
   backgroundColor:COLORS.color_white,
    paddingHorizontal:4,
    paddingVertical:5,
  },
  listUserChat:{
   paddingVertical:10,
   backgroundColor:COLORS.color_white,
   paddingHorizontal:10,
  },
  imageStyle:{
    width:'100%',
    height:'100%',
    resizeMode:'center',
    borderRadius:30
  },
  itemChat:{
    width:'100%',
    height:80,
    elevation:1,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:COLORS.color_white,
    marginBottom:1,
    borderRadius:6,
  },
  itemChatImage:{
   backgroundColor:'white',
   width:60,
   height:60,
   marginHorizontal:3,
   borderRadius:50,
   elevation:1,
   marginBottom:1,
   borderColor:COLORS.color_primary
  },
  nameTitle:{
    color:COLORS.color_black,
    fontSize: 18,
    marginLeft:6,
    fontWeight:'300',
  },
  mess:{
    color:COLORS.color_grey,
    fontSize: 16,
    marginLeft:6,
    fontWeight:'300',
    marginTop:4,
  }
});
export default MailboxScreen;
