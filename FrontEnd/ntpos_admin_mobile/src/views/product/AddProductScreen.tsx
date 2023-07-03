import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { launchImageLibrary } from 'react-native-image-picker'
import { InputComponent } from '../../components';
const AddProductScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [imagesOb, setImagesOb] = useState<[url: string]>();
    const [categories, setCategories] = useState();
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [unit, setUnit] = useState('');
    const [status, setstatus] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <View style={{ flexDirection: 'row' }}>
                    <ImageBackground source={{
                        uri: 'null',
                    }}
                        style={{ width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white, alignItems: 'flex-end', justifyContent: 'flex-start' }}
                    >
                        <TouchableOpacity style={{ backgroundColor: '#00000030', borderRadius: 20 }} onPress={() => { }}>
                            <IconIocns name='close' size={40} color={COLORS.color_white} />
                        </TouchableOpacity>
                    </ImageBackground>
                    <View style={{ alignItems: 'center', width: 150, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', marginLeft: 10, }}>
                        <TouchableOpacity onPress={() => { }}>
                            <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.boxContent}>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tên hàng</Text>
                        <InputComponent
                            value={name}
                            onChangeText={setName}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhóm hàng</Text>
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled></TextInput>
                        <TouchableOpacity onPress={() => { navigation.push('SelectAddCategory') }} style={{ width: '10%', }}>
                            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Giá bán</Text>
                        <InputComponent
                            value={price + ''}
                            onChangeText={setPrice}
                            placeholder='Giá'
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Đơn vị</Text>
                        <InputComponent
                            value={unit}
                            onChangeText={setUnit}
                            placeholder='vnd'
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Số lượng</Text>
                        <InputComponent
                            value={quantity + ''}
                            onChangeText={setQuantity}
                            placeholder='0'
                            style={styles.textContent}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTitle}>Mô tả</Text>
                    <View style={styles.des}>
                        <InputComponent
                            value={description}
                            onChangeText={setDescription}
                            placeholder='vnd'
                            style={styles.des}
                            multiline={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};
const styles = StyleSheet.create({
    des: {
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    container: {
        flex: 1,
    },
    boxImage: {
        marginTop: 10,
        marginBottom: 10,
        height: '20%',
        alignItems: 'center',
    },
    boxContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.color_white
    },
    name: {
        fontSize: responsiveFontSize(2.5),
        color: COLORS.color_black,
        fontWeight: '500',
        marginBottom: 10,
    },
    itemContent: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        width: '30%',
        fontSize: responsiveFontSize(2.1),
        color: COLORS.color_grey
    },
    textContent: {
        width: '70%',
        fontSize: responsiveFontSize(2.3),
        borderBottomWidth: 0.6,
        borderColor: COLORS.color_grey_seconds,
        paddingBottom: 10,
        color: COLORS.color_black,
    },
    box: {
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.color_white
    },
    des: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    }
});
export default AddProductScreen;