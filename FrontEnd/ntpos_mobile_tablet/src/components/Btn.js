import {border} from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
export default function Btn({
  bgColor,
  title,
  textColor,
  onPress,
  width,
  borderColor,
  fontSize,
  marginTop,
  fontWeight,
  borderRadius,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
        borderRadius: borderRadius == null ? 100 : borderRadius,
        alignItems: 'center',
        width: width,
        borderWidth: 1,
        borderColor: borderColor,
        marginTop: marginTop,
      }}>
      <Text
        style={{
          color: textColor,
          fontSize: fontSize,
          padding: 10,
          fontWeight: fontWeight,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
