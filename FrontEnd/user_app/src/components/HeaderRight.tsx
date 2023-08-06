import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/common';

interface Props {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const HeaderRight: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}
      >
        <Iconicons
          name="chatbox"
          size={25}
          color={COLORS.color_white}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}
      >
        <Iconicons
          name="notifications"
          size={25}
          color={COLORS.color_white}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10,
    color: COLORS.darkGreen,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 90,
  },
});

export default HeaderRight;
