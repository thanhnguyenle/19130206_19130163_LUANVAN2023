import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Category } from '../../models/category';
import { createProduct } from '../../redux_store/product/productSlice';
import axios from 'axios';
import { dispatchCategorysNull } from '../../redux_store/product/categorySlice';
import { linkImage } from '../../constants/LinkAPI';
const AddProductScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('Nhu');
    const selectedCategorys = useSelector((state: RootState) => state.product.categorysSevice.selectedCategorys);
    const [imagesOb, setImagesOb] = useState(['']);
    const [categories, setCategories] = useState<Category[]>([]);
    const [description, setDescription] = useState('nhu');
    const [quantity, setQuantity] = useState('56');
    const [price, setPrice] = useState('56');
    const [unit, setUnit] = useState('vn');
    const [status, setStatus] = useState('ACTIVE');
    const [imageUploadNew, setImageUploadNew] = useState(['']);
    const [selectedImages, setSelectedImages] = useState<ImagePickerResponse[]>([]);
    const isBooleanCreate = useSelector((state: RootState) => state.product.productsSevice.createSucess);
    useEffect(() => {
        dispatch(dispatchCategorysNull());
    }, [dispatch]);
    const getCategoryIds = <T extends Category>(categories: T[]): string[] => {
        return categories.map(category => category.id);
    };
    const categoryIds: string[] = getCategoryIds(selectedCategorys);
    const deleteImage = (index: number) => {
        const updatedImages = [...imagesOb];
        updatedImages.splice(index, 1);
        setImagesOb(updatedImages);
    };
    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
            if (response && !response.didCancel) {
                setSelectedImages(prevImages => [...prevImages, response]);
            }
        });
    };
    const uploadImage = async (fileUri: any) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: fileUri.assets[0].uri,
                name: fileUri.assets[0].fileName,
                type: fileUri.assets[0].type,
            });
            const response = await fetch('https://4cb1-27-65-196-160.ngrok-free.app/api/image', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gp',
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                imagesOb.push(`https://4cb1-27-65-196-160.ngrok-free.app/api/image/${data.id}`);
            } else {
                console.log('Request failed with status:', response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };
    async function handleImageUpload(selectedImagesVar: any[]) {
        if (selectedImagesVar.length > 0) {
            for (let i = 0; i < selectedImagesVar.length; i++) {
                await uploadImage(selectedImagesVar[i]);
            }
        }
        else {
            console.log('Không có')
        }
    }


    async function handleCreateProduct() {
        try {
            await handleImageUpload(selectedImages);
            if (selectedCategorys.length > 0) {
                setCategories(selectedCategorys);
            }
            dispatch(createProduct({ name, description, images: imagesOb, price, quantity, status, unit, categories: categoryIds }));
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', marginRight: 10, marginLeft: 10, width: 50, height: 150, backgroundColor: COLORS.color_grey_seconds, justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity onPress={() => { handleChoosePhoto(); }}>
                            <IconIocns name='camera' size={40} color={COLORS.color_grey} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal>
                        {selectedImages.map((image, index) => (
                            <ImageBackground
                                key={index}
                                source={{ uri: image.assets[0].uri }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 20,
                                    backgroundColor: COLORS.color_white,
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <TouchableOpacity
                                    style={{ backgroundColor: '#00000030', borderRadius: 20 }}
                                    onPress={() => { setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index)) }}
                                >
                                    <IconIocns name='close' size={40} color={COLORS.color_white} />
                                </TouchableOpacity>
                            </ImageBackground>
                        ))}
                        {
                            imagesOb?.length > 0 ?
                                imagesOb.map((item, index) => (
                                    <ImageBackground source={{ uri: item.url + '' }} key={index}
                                        style={[styles.content, {
                                            width: 150,
                                            height: 150,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.color_white,
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-start'
                                        }]} >
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
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled>{
                            (selectedCategorys.length > 0) ?
                                selectedCategorys.map((category, index) => (
                                    <Text key={index}>{(categories.length - 1) != index ? category.name + ', ' : category.name + ' '}</Text>
                                )) :
                                categories.map((category, index) => (
                                    <Text key={index}>{(categories.length - 1) != index ? category.name + ', ' : category.name + ' '}</Text>
                                ))
                        }</TextInput>
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
                    <View style={styles.itemContent}>
                        <Text style={styles.textTitle}>Trạng thái</Text>
                        <InputComponent
                            value={status}
                            onChangeText={setStatus}
                            placeholder=''
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
                <View style={{ alignItems: 'center', flex: 1, marginTop: 10, marginBottom: 30, }}>
                    <ButtonComponent title='Lưu' onPress={async () => {
                        await handleCreateProduct();
                        if (isBooleanCreate == true) {
                            Alert.alert('Thông báo', 'Đã tạo sản phẩm thành công!');
                            navigation.replace('Product');
                        }
                        else {
                            Alert.alert('Thông báo', 'Tạo sản phẩm thất bại!');
                        }
                    }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
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
    textDes: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_black
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginHorizontal: 10,
    },
});
export default AddProductScreen;