import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { editProductRequest, editProductSuccess } from '../../redux_store/product/productSlice';
import { ButtonComponent, InputComponent } from '../../components';
const EditProductScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product.products.product);
    const [id, setID] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [images, setImages] = useState(product.images);
    const [categories, setCategories] = useState(product.categories);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity + '');
    const [price, setPrice] = useState(product.price + '');
    const [unit, setUnit] = useState(product.unit);
    const [status, setstatus] = useState(product.status);

    const deleteImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    function handleEditProduct() {
        dispatch(editProductRequest({ id, name, description, categories, images, price, quantity, status, unit }));
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.boxImage}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', marginRight: 10, marginLeft: 10, width: 50, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', alignContent: 'center' }}>
                            <TouchableOpacity>
                                <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal>
                            {
                                images?.length > 0 ?
                                    images.map((item, index) => (
                                        <ImageBackground source={{ uri: item.url + '' }} key={index}
                                            style={[styles.content, { width: 150, height: 150, borderRadius: 20, backgroundColor: COLORS.color_white }]} >
                                            <TouchableOpacity
                                                style={{ backgroundColor: '#00000030', borderRadius: 20 }}
                                                onPress={() => deleteImage(index)}>
                                                <IconIocns name='close' size={40} color={COLORS.color_white} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )) : null
                            }
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.boxContent}>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tên</Text>
                        <InputComponent
                            value={name}
                            onChangeText={setName}
                            placeholder='Tên'
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Nhóm hàng</Text>
                        <TextInput style={styles.textContent} placeholder=''>{categories}</TextInput>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Giá bán</Text>
                        <InputComponent
                            value={price}
                            onChangeText={setPrice}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Tồn kho</Text>
                        <InputComponent
                            value={quantity}
                            onChangeText={setQuantity}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Đơn vị</Text>
                        <InputComponent
                            value={unit}
                            onChangeText={setUnit}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Trạng thái</Text>
                        <InputComponent
                            value={status}
                            onChangeText={setstatus}
                            placeholder=''
                            style={styles.textContent}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textTitle}>Mô tả</Text>
                    <InputComponent
                        value={description}
                        onChangeText={setDescription}
                        placeholder=''
                        style={styles.des}
                    />
                </View>
                <View style={{ alignItems: 'center', flex: 1, marginTop: 10, marginBottom: 30, }}>
                    <ButtonComponent title='Cập nhật' onPress={() => {
                        handleEditProduct();
                        navigation.pop();
                        navigation.replace('DetailProdcuct', { id: product.id })
                    }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
                </View>
            </ScrollView >
        </View >
    );
};
const styles = StyleSheet.create({
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
        alignItems: 'center'

    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginHorizontal: 10,
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
        borderColor: COLORS.color_black,
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
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
    },
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    }
});
export default EditProductScreen;