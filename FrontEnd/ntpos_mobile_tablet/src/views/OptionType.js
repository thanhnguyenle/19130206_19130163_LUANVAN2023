import React from 'react'
import { View, ScrollView } from 'react-native'
import TypeApp from '../components/TypeApp';
import { COLORS } from '../constants/common';

const OptionType = ({ navigation }) => {
    return (
        <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView>
                <TypeApp title={"Người dùng"} textColor={COLORS.color_black} onPress={() => {
                    navigation.replace('DrawerUserNavigationRoutes');
                }} />
                <TypeApp title={"Bán hàng"} textColor={COLORS.color_black} />
                <TypeApp title={"Quản lý cửa hàng"} textColor={COLORS.color_black} />
            </ScrollView>
        </View>
    )
}
export default OptionType;
