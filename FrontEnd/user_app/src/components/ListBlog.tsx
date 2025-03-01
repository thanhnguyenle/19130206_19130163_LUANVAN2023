import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import TitleButton from './TitleButton';
import BlogItem from './BlogItem';

interface ListBlogProps {
    onPressTitle: () => void;
    listBlog: any[];
    navigation: any;
}

const ListBlog: React.FC<ListBlogProps> = ({ onPressTitle, listBlog }) => {
    return (
        <View>
            <TitleButton title={'Bài viết'} onPress={onPressTitle} />
            <View style={styles.container}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={listBlog}
                    keyExtractor={(item, index) => 'key' + index}
                    pagingEnabled
                    scrollEnabled
                    horizontal={true}
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <BlogItem item={item} />;
                    }}
                />
            </View>
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height: height / 3.5,
    },
});

export default ListBlog;
