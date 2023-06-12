import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import { COLORS } from '../constants/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
const BlogStack = createNativeStackNavigator();
import { TouchableOpacity } from 'react-native'
import BlogScreen from '../views/BlogScreen';

const BlogScreenStack = ({ navigation }: any) => {
    return (
        <BlogStack.Navigator
            initialRouteName='HomeBlog'
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
            <BlogStack.Screen
                name='HomeBlog'
                component={BlogScreen}
                options={{
                    title: 'Tin tức/Sự kiện',
                }}
            />
        </ BlogStack.Navigator>
    );
}
export default BlogScreenStack;