import React, { Component, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/common';
import {color} from "react-native-elements/dist/helpers";

interface ChatInputProps {
  onSubmit: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const [text, setText] = useState('');

  const onChangeText = (text: string) => setText(text);

  const onSubmitEditing = ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) =>
    setText(text);
  const submit = () => {
    if (text) {
      props.onSubmit(text);
    } else {
      Alert.alert('Please enter your comment first');
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor={COLORS.color_grey}
          keyboardType="twitter" // keyboard with no return button
          autoFocus={true} // focus and show the keyboard
          style={styles.input}
          value={text}
          onChangeText={onChangeText} // handle input changes
          onSubmitEditing={onSubmitEditing} // handle submit event
          multiline={true}
          numberOfLines={10}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={[styles.text, !text ? styles.inactive : []]}>Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
    padding:20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: '#000',
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: COLORS.color_primary,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ChatInput;
