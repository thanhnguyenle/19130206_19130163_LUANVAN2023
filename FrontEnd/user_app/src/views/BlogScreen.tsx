import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { COLORS } from '../constants/common';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Tab, TabView } from '@rneui/themed';
import Icons from 'react-native-vector-icons/Entypo';
const BlogScreen = ({ navigation }: any) => {
    const [index, setIndex] = React.useState(0);
    return (
        <View>

        </View>
    );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    boxChat: {
        height: height / 8,
        marginTop: 10,
    },
    itemChat: {
        flexDirection: 'row',
        margin: 8,
    },
    avatar: {
        width: 55,
        height: 55,
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        textAlign: 'center',
        elevation: 1.5,
    },
    imageBg: {
        width: '98%',
        height: '98%',
        borderRadius: 50,
    },
    information: {
        marginLeft: 20,
        width: '60%',
        justifyContent: 'center',
    },
});
export default BlogScreen;
