import React, { useState } from 'react';
import { View, StyleSheet, NavigationScreenProp } from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { COLORS } from '../constants/common';
import ListChat from '../components/chat/ListChat';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const ChatBox: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ListChat />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatBox;
