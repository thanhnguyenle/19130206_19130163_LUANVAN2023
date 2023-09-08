import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { COLORS } from '../../constants/common';
import IconIocns from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { ButtonComponent, InputComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addRequsetGroup } from '../../redux_store/client/group/groupSlice';
import {
  requestMaterialsAll,
  requestMaterialsSetup,
  requestSetDefault
} from "../../redux_store/cancellation/CancellationSlice";
import { FlatList } from "react-native-gesture-handler";
import { MaterialAll, MaterialSetupDefault } from "../../models/inventory";
const EstablishScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const listMaterialsAll = useSelector((state: RootState) => state.inventory.cancellationService.listMaterialAll);
  const [listMaterialsAll1, setListMaterialsAll1] = useState(listMaterialsAll);

  useEffect( () =>  {
    dispatch(requestMaterialsAll());
    setListMaterialsAll1(listMaterialsAll)
  }, []);
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedList: MaterialAll[] = [...listMaterialsAll1];
    const itemToUpdate = updatedList[index];
    console.log(itemToUpdate)
    if(itemToUpdate != null){
      itemToUpdate.quantity = newQuantity;
      setListMaterialsAll1(updatedList);
    }
  };
  const handleSetupDefault= async () => {
    const materialSetupDefaultInput1 : MaterialSetupDefault[]  = listMaterialsAll1.map((item) => ({
      materialID: item.id,
      unit: item.unit,
      quantity: item.quantity,
      status:item.status,
      description:item.description,
    }));
    await dispatch(requestSetDefault(materialSetupDefaultInput1));
  };
  return (
    <View style={styles.container}>
        <FlatList
          style={{ flex: 1, width: '100%', marginBottom: 10, backgroundColor:COLORS.color_white }}
          data={listMaterialsAll}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemContent}>
                <Text style={styles.textTitle}>{item.name}</Text>
                <InputComponent
                  value={item.quantity+''}
                  onChangeText={()=>{}}
                  placeholder=''
                  style={styles.textContent}
                  editable={false}
                />
                <InputComponent
                  value={quantity+''}
                  onChangeText={(newQuantity) => {
                      handleQuantityChange(index, newQuantity);
                  }}
                  placeholder=''
                  style={styles.textContent1}
                />
                <Text style={styles.textTitle1}>{item.unit}</Text>
              </View>
            )
          }}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 0.6, backgroundColor: COLORS.color_grey_seconds }}></View>
          }}
        />
      <View style={{alignItems:'center'}}>
        <ButtonComponent title='Thêm' onPress={()=>{
          handleSetupDefault().then(r=>navigation.replace('Cancellation'))
        }} containerStyle={{ width: '50%', backgroundColor: COLORS.darkGreen, marginBottom:10 }} />
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  boxFifter: {
    paddingTop: responsiveHeight(1),
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
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
    width: '20%',
    fontSize: responsiveFontSize(2.2),
    color: COLORS.color_black
  },
  textTitle1: {
    width: '18%',
    fontSize: responsiveFontSize(1.8),
    color: COLORS.color_black
  },
  textContent: {
    width: '15%',
    fontSize: responsiveFontSize(2),
    borderBottomWidth: 0.6,
    borderColor: COLORS.color_white,
    color: COLORS.color_black,
    marginRight:10,
    textAlign:'center',
  },
  textContent1: {
    width: '30%',
    fontSize: responsiveFontSize(2.0),
    borderBottomWidth: 0.6,
    borderColor: COLORS.darkGreen,
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
export default EstablishScreen;
