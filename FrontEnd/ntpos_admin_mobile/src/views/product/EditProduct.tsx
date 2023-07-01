import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Platform, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { editProductRequest, editProductSuccess } from '../../redux_store/product/productSlice';
import { ButtonComponent, InputComponent } from '../../components';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Category } from '../../models/categorys';
import { dispatchCategorysNull } from '../../redux_store/product/categorySlice';
const EditProductScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product.products.product);
    const [id, setID] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [imagesOb, setImagesOb] = useState<[url: string]>(product.images);
    const [categories, setCategories] = useState(product.categories);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity + '');
    const [price, setPrice] = useState(product.price + '');
    const [unit, setUnit] = useState(product.unit);
    const [status, setstatus] = useState(product.status);
    const [selectedImages, setSelectedImages] = useState<ImagePickerResponse[]>([]);
    const selectedCategorys = useSelector((state: RootState) => state.product.categorys.selectedCategorys);
    const [imageUploadNew, setImageUploadNew] = useState([]);
    useEffect(() => {
        dispatch(dispatchCategorysNull());
    }, [dispatch]);
    const getCategoryIds = <T extends Category>(categories: T[]): string[] => {
        return categories.map(category => category.id);
    };
    const categoryIds: string[] = getCategoryIds(selectedCategorys);
    const deleteImage = (index: number) => {
        const updatedImages: [url: string] = [...imagesOb];
        updatedImages.splice(index, 1);
        setImagesOb(updatedImages);
    };
    const handleChoosePhoto = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
            if (response) {
                setSelectedImages(prevImages => [...prevImages, response]);
                console.log('response' + selectedImages);
            }
        });
    };
    function handleImageUpload() {
        if (!selectedImages.length) {
            return;
        }

        const formData = new FormData();
        selectedImages.forEach(image => {
            if (image.assets) {
                formData.append('image', {
                    name: image.assets[0].fileName,
                    type: image.assets[0].type,
                    uri: Platform.OS === 'ios' ? image.assets[0].uri!.replace('file://', '') : image.assets[0].uri,
                });
            }
        });

        const clientId = '28dbc5a4ac6a7b3'; // Replace with your Imgur client ID
        axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Client-ID ${clientId}`,
            },
        })
            .then(response => {
                if (response.data.success) {
                    const uploadedUrls = response.data.data.map((item: any) => item.link);
                    setImageUploadNew(uploadedUrls);
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                Alert.alert('Upload Failed', 'Failed to upload the image. Please try again.');
            });
    }
    function handleEditProduct() {
        handleImageUpload();
        const images: string[] = [];
        for (let i = 0; i < imageUploadNew.length; i++) {
            const imageUrl2 = imageUploadNew[i].assets[0].uri;
            console.log(imageUrl2)
            images.push(imageUrl2);
        }
        for (let i = 0; i < imagesOb.length; i++) {
            const imageUrl = imagesOb[i].url;
            images.push(imageUrl);
        }
        if (selectedCategorys.length > 0) {
            setCategories(selectedCategorys);
        }
        console.log(images)
        dispatch(editProductRequest({ id, name, description, images, price, quantity, status, unit, categories: categoryIds }));
        console.log(categoryIds);
    }
    return (
        <View style={styles.container}>
            <ScrollView>
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
                        <TextInput style={[styles.textContent, { width: '60%', }]} editable={false} placeholder='' aria-disabled>{
                            (selectedCategorys.length > 0) ?
                                selectedCategorys.map((category, index) => (
                                    <Text key={index}>{(categories.length - 1) != index ? category.name + ', ' : category.name + ' '}</Text>
                                )) :
                                categories.map((category, index) => (
                                    <Text key={index}>{(categories.length - 1) != index ? category.name + ', ' : category.name + ' '}</Text>
                                ))
                        }</TextInput>
                        <TouchableOpacity onPress={() => { navigation.push('SelectAddCategory', { categories: product.categories }); }} style={{ width: '10%', }}>
                            <IconIocns name='chevron-forward-sharp' size={20} color={COLORS.color_grey} />
                        </TouchableOpacity>
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