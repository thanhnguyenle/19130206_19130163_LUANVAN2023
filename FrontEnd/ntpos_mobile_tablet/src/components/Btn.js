import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
export default function Btn({bgColor, title, textColor, onPress}) {
    return(
    <TouchableOpacity style={{backgroundColor:bgColor,borderRadius:100,alignItems:'center',width:250}}>
     <Text style={{color:textColor,fontSize:20,padding:10,fontWeight:'bold'}}>{title}</Text>
    </TouchableOpacity>
    );
}