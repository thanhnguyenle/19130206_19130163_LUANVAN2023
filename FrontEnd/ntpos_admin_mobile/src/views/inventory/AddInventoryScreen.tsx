import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Alert, ScrollView } from "react-native";
import { COLORS } from '../../constants/common';
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SelectDropdown from 'react-native-select-dropdown';
import LoadingScreen, { hideLoader, loaderRef, showLoader } from "../../components/LoadingScreen";
import { convertDateToTimestampInSeconds, formatDateFromNumber, isValidDate } from "../../utils/function";
import { createInventory } from "../../redux_store/inventory/InventorySlice";
import moment from "moment";
const AddInventoryScreen = ({ navigation }: any) => {
  const statusTypePC = ["ACTIVE" ,"INACTIVE"];
  const unitList = ["Gram" ,"Kilogram", 'Mililít','Lít','Muỗng','Cốc','Quả','Vỉ','Gói','Lon'];
  const dispatch = useDispatch();
  const [statusPC, setStatusPC] = useState(statusTypePC[0]);
  const [name, setName] = useState('Đường');
  const [unit, setUnit] = useState(unitList[1]);
  const [total, setTotal] = useState(120000);
  const [expiredDate, setExpiredDate] = useState('2023-04-01');
  const [manufacturerDate, setManufacturerDate] = useState('2025-04-01');
  const [quantity, setQuantity] = useState(4);
  const [description, setDescription] = useState('');
  const [errorText, setErrorText] = useState('');
  const [errorText1, setErrorText1] = useState('');
  const handleExpiredDateChange = (newDate: string) => {
    setExpiredDate(newDate);
    if (!isValidDate(newDate)) {
      setErrorText('Ngày không hợp lệ');
    } else {
      setErrorText('');
    }
  };
  const handleManufacturerDateChange = (newDate: string) => {
    setManufacturerDate(newDate);
    if (!isValidDate(newDate)) {
      setErrorText1('Ngày không hợp lệ');
    } else {
      setErrorText1('');
    }
  };
  async function handleCreate(){
    showLoader();
    dispatch(createInventory({
      name,
      price:total,
      unit,
      quantity,
      status : statusPC,
      description,
      expiredDate: parseInt(convertDateToTimestampInSeconds(expiredDate)),
      manufacturerDate:  parseInt(convertDateToTimestampInSeconds(manufacturerDate)),
     }
    ));
    hideLoader();
    navigation.replace('Inventory')
  }
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.boxContent}>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Tên nguyên liệu</Text>
          <InputComponent
            value={name}
            onChangeText={setName}
            placeholder=''
            style={[styles.textContent]}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Số lượng</Text>
          <InputComponent
            value={quantity+''}
            onChangeText={setQuantity}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Đơn vị</Text>
          <SelectDropdown
            buttonStyle={{backgroundColor:'#ffffff', borderStyle:'dotted',borderBottomWidth:0.4,width:'60%', height:'auto'}}
            buttonTextStyle={{color:'green', fontSize:12, padding:4}}
            data={unitList}
            onSelect={(selectedValue) => setUnit(selectedValue)}
            defaultButtonText={unit}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Mô tả</Text>
          <InputComponent
            value={description}
            onChangeText={setDescription}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Ngày nhập</Text>
          <InputComponent
            value={expiredDate}
            onChangeText={handleExpiredDateChange}
            placeholder='ví dụ: 2001-09-01'
            style={styles.textContent}
          />
        </View>
        {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Ngày hết hạn</Text>
          <InputComponent
            value={manufacturerDate}
            onChangeText={handleManufacturerDateChange}
            placeholder='ví dụ: 2001-09-01'
            style={styles.textContent}
          />
        </View>
        {errorText1 ? <Text style={styles.errorText}>{errorText1}</Text> : null}
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Tổng tiền</Text>
          <InputComponent
            value={total+''}
            onChangeText={setTotal}
            placeholder=''
            style={styles.textContent}
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.textTitle}>Trạng thái</Text>
          <SelectDropdown
            buttonStyle={{backgroundColor:'#ffffff', borderStyle:'dotted',borderBottomWidth:0.4,width:'60%', height:'auto'}}
            buttonTextStyle={{color:'green', fontSize:12, padding:4}}
            data={statusTypePC}
            onSelect={(selectedValue) => setStatusPC(selectedValue)}
            defaultButtonText={statusPC}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 10,padding:10 }}>
          <ButtonComponent title='Tạo' onPress={handleCreate} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen }} />
        </View>
      </View>
      </ScrollView>
      <LoadingScreen ref={loaderRef} />
    </View >
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign:'right'
  },
  container: {
    flex: 1,
  },
  boxContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: COLORS.color_white
  },
  textContent: {
    width: '70%',
    fontSize: responsiveFontSize(2.3),
    borderBottomWidth: 0.6,
    borderColor: COLORS.color_grey_seconds,
    paddingBottom: 10,
    color: COLORS.color_black,
  },
  itemContent: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTitle: {
    width: '30%',
    fontSize: responsiveFontSize(2.1),
    color: COLORS.color_black
  },
})
export default AddInventoryScreen;
