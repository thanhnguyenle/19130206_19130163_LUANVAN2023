import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const ListTableStoreStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import SearchScreen from '../views/SearchScreen';
import HomeScreen from '../views/HomeScreen';
import ListTableStore from '../views/ListTableStoreScreen';

const ListTableStoreScreenStack = ({ navigation }: any) => {
    return (
        <ListTableStoreStack.Navigator
            initialRouteName='HomeListTableStore'
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
            <ListTableStoreStack.Screen
                name='HomeListTableStore'
                component={ListTableStore}
                options={{
                    title: 'Danh sách bàn',
                }}
            />
        </ ListTableStoreStack.Navigator>
    );
}
export default ListTableStoreScreenStack;