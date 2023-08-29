import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MailboxScreen } from '../views/ImportFile';
import NotificationScreenStack from './NotificationStack'
const MailBoxStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import DetailChatScreen from "../views/mailbox/DetailChat";
import React from "react";

const MailBoxScreenStack = ({ navigation }: any) => {
    return (
        <MailBoxStack.Navigator
            initialRouteName='MailBox'
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
            <MailBoxStack.Screen
                name='MailBox'
                component={MailboxScreen}
                options={{
                    title: 'Hộp thư',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.openDrawer();
                        }}>
                            <Ionicons name='menu' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <MailBoxStack.Screen
                name="NotificationStack"
                component={NotificationScreenStack}
                options={{ headerShown: false }}
            />
          <MailBoxStack.Screen
            name="DetailChatScreen"
            component={DetailChatScreen}
            options={{
              title: 'Chat với người dùng',
              headerLeft: () => (
                <TouchableOpacity onPress={() => {
                  navigation.pop();
                }}>
                  <Ionicons name='close' size={25} color={COLORS.darkGreen} style={{ marginRight: 10, }} />
                </TouchableOpacity>
              ),
            }}
          />

        </ MailBoxStack.Navigator>
    );
}
export default MailBoxScreenStack;
