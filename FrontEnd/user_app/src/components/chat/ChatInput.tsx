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

interface ChatInputProps {
  onSubmit: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const [text, setText] = useState('');

  const onChangeText = (text: string) => setText(text);

  const onSubmitEditing = ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) =>
    setText(text, submit);

  const submit = () => {
    if (text) {
      props.onSubmit(text);
    } else {
      Alert.alert('Please enter your comment first');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
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
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
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
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default ChatInput;
