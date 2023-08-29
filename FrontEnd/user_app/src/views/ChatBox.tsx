import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import ListChat from '../components/chat/ListChat';

interface Props {
  navigation: any;
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
