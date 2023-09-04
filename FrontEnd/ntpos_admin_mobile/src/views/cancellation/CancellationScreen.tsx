import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { COLORS } from "../../constants/common";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { FlatList, Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { BillComponent, BottomSheet, RadioButtonCom } from "../../components";
import IconIcons from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
import LoadingScreen, { hideLoader, loaderRef, showLoader } from "../../components/LoadingScreen";
import { formatDateFromNumber, formatPrice, generateFourDigitCode, shortenOrderID } from "../../utils/function";
import { deleteOrder, deleteOrderNull, fetchOrdersStart } from "../../redux_store/orders/ordersSilce";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/AntDesign";

const CancellationScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const [locThoiGia, setLocThoiGian] = useState('homnay');
  const loading = useSelector((state: RootState) => state.inventory.cancellationService.loading);
  const error = useSelector((state: RootState) => state.inventory.cancellationService.error);
  const listMaterials = useSelector((state: RootState) => state.inventory.cancellationService.listMaterials);
  function getNameTitle(value: string): string {
    let valueNew = '';
    switch (value) {
      case 'homnay':
        valueNew = 'Hôm nay'
        break;
      case 'homqua':
        valueNew = 'Hôm qua'
        break;
      case 'toanthoigia':
        valueNew = 'Toàn thời gian'
        break;
      case 'tuannnay':
        valueNew = 'Tuần này'
        break;
      case 'tuantruoc':
        valueNew = 'Tuần trước'
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
    return (
        <View style={styles.container}>
          <View style={styles.boxFifter}>
            <TouchableOpacity onPress={()=>{navigation.push('EstablishScreen')}}>
              <Text style={{fontSize:16, fontWeight:'500', color:COLORS.darkGreen}}>Thiết lập</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <FlatList
              style={{ flex: 1, width: '100%', marginBottom: 20 }}
              data={listMaterials}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                    <View style={styles.container1}>
                      <Text>Demo</Text>
                    </View>
                )
              }}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
              }}
            />
          </View>
          <LoadingScreen ref={loaderRef} />
        </View>
    );
};
const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.darkGreen,
    borderRadius: 40,
  },
  container: {
    flex: 1
  },
  boxFifter: {
    paddingTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginBottom: responsiveHeight(0),
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
    width: responsiveWidth(40),
  },
  box3: {
    width: responsiveWidth(20),
  },
  deleteBox: {
    height: '100%',
    padding: 10,
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f04d4f',
  },
  bgButton: {
    padding: 20,
    backgroundColor: COLORS.color_white,
    border: 1,
    borderColor: COLORS.darkGreen,
    marginHorizontal: 10,
    width: '44%',
    elevation: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderBottomColor: COLORS.darkGreen,
    borderWidth: 1,
  },
  bgButton1: {
    padding: 20,
    backgroundColor: COLORS.color_white,
    border: 1,
    borderColor: COLORS.darkGreen,
    width: '44%',
    marginHorizontal: 10,
    elevation: -1,
    borderRadius: 10,
    alignItems: 'center'
  },
  textButton: {
    color: COLORS.darkGreen,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
})
export default CancellationScreen;
