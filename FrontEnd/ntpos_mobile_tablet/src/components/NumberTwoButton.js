import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {COLORS} from '../constants/common';
const NumberTwoButton = props => {
  const [number, setNumber] = [props.value, props.setValue];
  function increase() {
    let intText = parseInt(number);
    intText < 20 ? intText++ : intText;
    setNumber('' + intText);
  }
  function decrease() {
    let intText = parseInt(number);
    intText > 1 ? intText-- : intText;
    setNumber('' + intText);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={decrease}
        disabled={number <= 1 ? true : false}>
        <Text style={styles.title}>-</Text>
      </TouchableOpacity>
      <TextInput {...props} style={styles.input} />
      <TouchableOpacity
        style={styles.button}
        onPress={increase}
        disabled={number >= 20 ? true : false}>
        <Text style={styles.title}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    margin: 2,
    padding: 8,
    backgroundColor: COLORS.darkGreen,
    borderRadius: 10,
    width: 40,
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.color_white,
    fontSize: 18,
  },
  input: {
    borderWidth: 0.4,
    width: 40,
    textAlign: 'center',
    borderColor: '#fff9',
    borderRadius: 10,
    color: COLORS.color_black,
  },
});
export default NumberTwoButton;
