import React, {Component, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/common';

const InputComponent = props => {
  const [text, setText] = useState('');

  // Update state when input changes
  const onChangeText = text => setText(text);

  // Handle return press on the keyboard
  // NOTE: You don't really need it for this example, because
  // we're using a keyboard without return button, but I left it here
  // in case you'd want to switch to a different keyboard
  const onSubmitEditing = ({nativeEvent: {text}}) =>
    this.setState({text}, this.submit);

  // Call this.props.onSubmit handler and pass the comment
  const submit = () => {
    if (text) {
      props.onSubmit(text);
    } else {
      Alert.alert('Please enter your comment first');
    }
  };

  return (
    // This moves children view with input field and submit button
    // up above the keyboard when it's active
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container}>
        {/* Comment input field */}
        <TextInput
          placeholder="Add a comment..."
          placeholderTextColor={COLORS.color_grey}
          keyboardType="twitter" // keyboard with no return button
          style={styles.input}
          value={text}
          onChangeText={onChangeText} // handle input changes
          onSubmitEditing={onSubmitEditing} // handle submit event
        />
        {/* Post button */}
        <TouchableOpacity style={styles.button} onPress={submit}>
          {/* Apply inactive style if no input */}
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
export default InputComponent;
