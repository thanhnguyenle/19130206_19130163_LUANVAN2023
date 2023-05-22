import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/common';
const HeaderRight = props => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ChatBox');
        }}>
        <Iconicons
          name="chatbox"
          size={25}
          color={COLORS.white}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ChatBox');
        }}>
        <Iconicons
          name="notifications"
          size={25}
          color={COLORS.white}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 90,
  },
});
export default HeaderRight;
