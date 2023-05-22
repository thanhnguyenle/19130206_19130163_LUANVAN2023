import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonComponent, CheckSheetComponent, RadioButtonCom } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { fetchListRolesRequest } from '../../redux_store/client/listRoleSlice';
const SelectRoleScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [checkboxes, setCheckboxes] = useState<{ roleName: string; checked: boolean }[]>([]);
    const roles = useSelector((state: RootState) => state.client.roles.roles);
    useEffect(() => {
        dispatch(fetchListRolesRequest());
    }, []);
    useEffect(() => {
        if (roles.length > 0) {
            const updatedCheckboxes = roles.map((role) => ({ roleName: role, checked: false }));
            setCheckboxes(updatedCheckboxes);
        }
    }, [roles]);
    // const handleCheckboxChange = (checkboxId: any) => {
    //     setCheckboxes((prevCheckboxes) =>
    //         prevCheckboxes.map((checkbox) =>
    //             checkbox.id === checkboxId
    //                 ? { ...checkbox, checked: !checkbox.checked }
    //                 : checkbox
    //         )
    //     );
    // };
    return (
        <View style={styles.container}>
            <View style={styles.listCategory}>
                {checkboxes.map((checkbox) => (
                    <View key={checkbox.roleName} style={styles.checkboxContainer}>
                        <CheckBox
                            containerStyle={styles.checkbox}
                            textStyle={styles.checkboxLabel}
                            checkedColor="green"
                            checked={checkbox.checked}
                            onPress={() => { }}
                        />
                        <Text style={styles.checkboxLabel}>{checkbox.roleName}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 40,
    },
    boxSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        textAlign: 'center',
        margin: 4,
        borderRadius: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderStartWidth: 0.5,
        borderEndWidth: 0.5,
        borderColor: COLORS.color_grey_seconds,
        // backgroundColor: COLORS.color_white,
    },
    listCategory: {
        backgroundColor: COLORS.color_white,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        padding: 8,
        backgroundColor: 'transparent',
    },
    checkboxLabel: {
        fontSize: responsiveFontSize(2.2),
    },
});
export default SelectRoleScreen;