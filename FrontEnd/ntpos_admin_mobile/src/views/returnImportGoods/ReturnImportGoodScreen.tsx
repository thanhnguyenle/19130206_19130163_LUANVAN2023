import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BottomSheet, RadioButtonCom } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/common';
import { RadioButton } from 'react-native-paper';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { formatDateFromNumber, generateFourDigitCode } from "../../utils/function";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { requestMaterialReturns } from "../../redux_store/inventory/InventorySlice";
import { hideLoader, showLoader } from "../../components/LoadingScreen";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";
const ReturnImportGoodScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.inventory.inventoryService.loading);
    const error = useSelector((state: RootState) => state.inventory.inventoryService.error);
    const listMaterialReturn = useSelector((state: RootState) => state.inventory.inventoryService.listMaterialReturn);

    const [locThoiGia, setLocThoiGian] = useState('homnay');
    function getNameTitle(value: string): string {
        let valueNew = '';
        switch (value) {
            case 'homnay':
                valueNew = 'Hôm nay'
                break;
            case 'homqua':
                valueNew = 'Hôm qua'
                break;
            case 'tuannnay':
                valueNew = 'Tuần này'
                break;
            case 'tuantruoc':
                valueNew = 'Tuần trước'
                break;
            case 'toanthoigia':
                valueNew = 'Toàn thời gian'
                break;
            case 'thangnay':
                valueNew = 'Tháng này'
                break;
            case 'thangtruoc':
                valueNew = 'Tháng trước'
                break;
            default:
                break;
        }
        return valueNew;
    }
    useEffect(() => {
        dispatch(requestMaterialReturns());
    }, []);
    const renderRightActions = (id: string) => (
      <TouchableOpacity style={styles.deleteBox} onPress={() => {
          Alert.alert(
            'Cảnh báo',
            'Bạn có muốn xóa sản phẩm này không?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK', onPress: async () => {
                        try {
                            showLoader();
                            setTimeout(() => {
                                hideLoader();
                                Toast.show({
                                    type: 'success',// success, error, info, or any
                                    text1: 'Xóa thành công 👋',
                                    position: 'top',
                                });
                            }, 1000);
                        } catch (error) {
                            console.error('Delete error:', error);
                            hideLoader();
                            Alert.alert(
                              'Thông báo',
                              'Có lỗi xảy ra khi xóa bàn.',
                            );
                        }

                    }
                }
            ]);
      }}>
          <Icon name='delete' size={20} style={{ color: COLORS.color_white, padding: 15 }} />
      </TouchableOpacity>
    );
    // Animate
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return <Text>Lỗi: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxFifter}>
                <BottomSheet title={getNameTitle(locThoiGia)} fontSize={responsiveFontSize(2)}
                    icon={<Ionicons name='ios-calendar-sharp' size={18} color={COLORS.darkGreen} style={{ marginLeft: 8, }} />}
                    height={460}
                    content={
                        <RadioButton.Group onValueChange={newLocThoiGia => setLocThoiGian(newLocThoiGia)} value={locThoiGia}>
                            <RadioButtonCom title='Toàn thời gian' value='toanthoigia' />
                            <RadioButtonCom title='Hôm nay' value='homnay' />
                            <RadioButtonCom title='Hôm qua' value='homqua' />
                            <RadioButtonCom title='Tuần này' value='tuannnay' />
                            <RadioButtonCom title='Tuần trước' value='tuantruoc' />
                            <RadioButtonCom title='Tháng này' value='thangnay' />
                            <RadioButtonCom title='Tháng trước' value='thangtruoc' />
                        </RadioButton.Group>
                    } />
                <View style={styles.boxTitle}>
                    <Text style={styles.text}>
                        Tổng số
                    </Text>
                    <Text style={[styles.text, { marginLeft: 2, color: COLORS.darkGreen }]}>
                        {listMaterialReturn.length}
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <FlatList
                  style={{ flex: 1, width: '100%', marginTop:10 }}
                  data={listMaterialReturn}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item , index}) => {
                      return (
                        <Swipeable renderRightActions={() => renderRightActions(item.id,)} >
                            <View style={styles.container1}>
                                <TouchableOpacity onPress={() => { navigation.push('DetailInventoryScreen', { id: item.id }) }}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <View style={styles.box1}>
                                            <Image source={require('../../assets/nguyenlieu4.png')} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                        </View>
                                        <View style={styles.box2}>
                                            <Text style={[styles.text, { color: COLORS.color_black, fontSize: responsiveFontSize(2.2) }]}>TNH{generateFourDigitCode(index+1)}</Text>
                                            <Text style={[styles.text, { color: COLORS.color_grey, fontSize: responsiveFontSize(2) }]}>{item.price}</Text>
                                        </View>
                                        <View style={styles.box3}>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={[styles.text, { color: COLORS.darkGreen, fontWeight: '500', fontSize: responsiveFontSize(2.2) }]}>Ngày trả: {formatDateFromNumber(item.returnDate)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Swipeable>
                      )
                  }}
                  ItemSeparatorComponent={() => {
                      return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
                  }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    boxFifter: {
        paddingTop: responsiveHeight(1),
        paddingLeft: responsiveWidth(2),
        paddingRight: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
        paddingBottom: responsiveHeight(1),
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    boxTitle: {
        flexDirection: 'row',
        marginRight: responsiveWidth(5),
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: COLORS.color_grey,
    },
    title: {
        marginBottom: responsiveHeight(1),
        marginLeft: responsiveWidth(2),
        fontSize: responsiveFontSize(2),
    },
    container1: {
        textAlign: 'center',
        borderRadius: 5,
        width: '99.1%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        backgroundColor: COLORS.color_white,
    },
    box1: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
    },
    box2: {
        width: responsiveWidth(30),
    },
    box3: {
        width: responsiveWidth(40),
    },
    deleteBox: {
        height: '100%',
        padding: 10,
        marginRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f04d4f',
    }
})
export default ReturnImportGoodScreen;
