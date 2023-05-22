import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../constants/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import Btn from '../components/Btn';
const EditProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{uri: 'https://i.imgur.com/pHlXewJ.png'}}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color={COLORS.color_white}
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.groupButton}>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={18} />
          <TextInput
            placeholder="Họ tên"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="phone" size={18} />
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={18} />
          <TextInput
            placeholder="Gmail"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-radius-outline" size={18} />
          <TextInput
            placeholder="Địa chỉ"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <Btn
          marginTop={20}
          width={250}
          borderColor={COLORS.darkGreen}
          bgColor={COLORS.darkGreen}
          fontSize={20}
          textColor={COLORS.color_white}
          title={'Cập nhật'}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
export default EditProfile;
const styles = StyleSheet.create({
  groupButton: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.darkGreen,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopStartRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTile: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.color_white,
  },
  action: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.color_primary,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
});
