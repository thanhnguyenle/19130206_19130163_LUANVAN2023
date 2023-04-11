import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/common';
import Icon from 'react-native-vector-icons/FontAwesome';

const Field = props => {
  return (
    <View
      style={{
        width: props.widthInput,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 100,
        backgroundColor: COLORS.darkGreen,
        marginVertical: 10,
        backgroundColor: COLORS.color_grey_seconds,
      }}>
      <TextInput
        {...props}
        style={{
          borderTopEndRadius: 100,
          color: COLORS.darkGreen,
          paddingHorizontal: 10,
          width: props.widthInput,
          marginLeft: 10,
        }}
        placeholderTextColor={COLORS.color_grey}
      />
      <Icon
        name={props.eye}
        size={20}
        color={COLORS.color_grey}
        style={{marginLeft: -10}}
        onPress={props.onShowPassword}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Field;
