import React from 'react';
import {View, ImageBackground} from 'react-native';
const Background = ({children}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={{height: '100%', width: '100%', position: 'absolute'}}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};
export default Background;
