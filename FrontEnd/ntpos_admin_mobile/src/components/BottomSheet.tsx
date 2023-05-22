import React, { useRef } from 'react';
import { View, Text, Button, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../constants/common';
import IconIcons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';

interface BottomSheetProps {
    title: string;
    icon: any;
    content: any;
    height: number;
    fontSize: number;

}

const BottomSheet: React.FC<BottomSheetProps> = ({ title, content, height, icon, fontSize }) => {
    const bottomSheetRef = useRef<RBSheet>(null);

    const openBottomSheet = () => {
        bottomSheetRef.current?.open();
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
    };

    return (
        <>
            <TouchableOpacity onPress={openBottomSheet}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#00000090', fontSize: fontSize }}>{title}</Text>
                    {icon == '' ? <IconIcons name='chevron-down-sharp' color={COLORS.color_grey} /> : icon}
                </View>
            </TouchableOpacity >
            <RBSheet ref={bottomSheetRef} height={height} duration={250} closeOnDragDown={true}>
                <ScrollView>
                    {content}
                </ScrollView>
                <TouchableOpacity onPress={closeBottomSheet}>
                    <View style={{ marginTop: 10, backgroundColor: COLORS.darkGreen, padding: 10, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.color_white, fontSize: 16 }}>Bỏ qua</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
        </>
    );
};
export default BottomSheet;

