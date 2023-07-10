import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import { AddProductScreen, CategorySelectScreen, DetailProductScreen, DetailTypeProductSceen, EditProductScreen, ProductSreen, SearchProductScreen } from '../views/ImportFile';
import NotificationScreenStack from '../routes/NotificationStack'
const ProductStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import { BottomSheet, RadioButtonCom } from '../components';
import { RadioButton } from 'react-native-paper'
import React, { useState } from 'react';
const ProductScreenStack = ({ navigation }: any) => {
    const [locDs, setLocDS] = useState('moinhat');
    return (
        < ProductStack.Navigator
            initialRouteName='Product'
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.color_white,
                },
                headerTintColor: COLORS.darkGreen,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerShown: true,
            }}
        >
            <ProductStack.Screen
                name='Product'
                component={ProductSreen}
                options={{
                    title: 'Danh sách món',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <Ionicons name='menu' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                                navigation.push('SearchProduct');
                            }}>
                                <Ionicons name='search-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 4, }} />
                            </TouchableOpacity>
                            <BottomSheet title='' fontSize={12}
                                icon={<Ionicons name='md-filter-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 8, }} />}
                                height={300}
                                content={
                                    <RadioButton.Group onValueChange={newLocDs => setLocDS(newLocDs)} value={locDs}>
                                        <RadioButtonCom title='Mới nhất' value='moinhat' />
                                        <RadioButtonCom title='Cũ nhất' value='cunhat' />
                                        <RadioButtonCom title='A->Z' value='az' />
                                        <RadioButtonCom title='Z->A' value='za' />
                                    </RadioButton.Group>
                                } />
                            <TouchableOpacity onPress={() => {
                                navigation.push('NotificationStack');
                            }}>
                                <Ionicons name='md-notifications-outline' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />
                            </TouchableOpacity>
                        </View>

                    ),
                }}
            />
            <ProductStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
            <ProductStack.Screen
                name="SearchProduct"
                component={SearchProductScreen}
                options={{
                    title: 'Tìm kiếm hàng hóa',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (

                        <TouchableOpacity onPress={() => {
                        }}>
                            <Text style={{ color: COLORS.darkGreen, fontSize: 18, fontWeight: '500' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ProductStack.Screen
                name="DetailSelectCategory"
                component={DetailTypeProductSceen}
                options={{
                    title: 'Chọn nhóm hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Text style={{ color: COLORS.darkGreen, fontSize: 18, fontWeight: '500' }}>Áp dụng</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ProductStack.Screen
                name="DetailProdcuct"
                component={DetailProductScreen}
                options={{
                    title: 'Chi tiết món',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                            navigation.replace('Product');
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigation.push('EditProduct')
                            }}>
                                <AntDesign name='edit' size={25} color={COLORS.darkGreen} style={{ marginRight: 20, }} />
                            </TouchableOpacity>
                            <BottomSheet title='' fontSize={12}
                                icon={<Entypo name='dots-three-horizontal' size={25} color={COLORS.darkGreen} style={{ marginRight: 2, }} />}
                                height={150}
                                content={
                                    <TouchableOpacity>
                                        <View style={{ marginTop: 10, padding: 10, alignItems: 'center' }}>
                                            <Text style={{ color: COLORS.color_red, fontSize: 18 }}>Xóa</Text>
                                        </View>
                                    </TouchableOpacity>
                                } />
                        </View>

                    ),
                }}
            />
            <ProductStack.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={{
                    title: 'Chỉnh sửa chi tiết',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ProductStack.Screen
                name="AddProdcuct"
                component={AddProductScreen}
                options={{
                    title: 'Thêm sản phẩm',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ color: COLORS.darkGreen, fontSize: 18, fontWeight: '500' }}>Lưu</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <ProductStack.Screen
                name="SelectAddCategory"
                component={CategorySelectScreen}
                options={{
                    title: 'Chọn nhóm hàng',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.pop();
                        }}>
                            <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </ ProductStack.Navigator>
    );
}
export default ProductScreenStack;