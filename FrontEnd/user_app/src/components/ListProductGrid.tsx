import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import TitleButton from './TitleButton';
import ProductItemPrice from './ProductItemPrice';

interface ListProductGridProps {
    title: string;
    onPressTitle: () => void;
    data: any[];
    navigation: any;
}

const ListProductGrid: React.FC<ListProductGridProps> = ({
    title,
    onPressTitle,
    data,
    navigation,
}) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View>
            <TitleButton title={title} onPress={onPressTitle} />
            <View style={styles.container}>
                <View style={styles.app}>
                    {data.map((item) => (
                        <ProductItemPrice
                            item={item}
                            navigation={navigation}
                            key={item.id}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    app: {
        marginHorizontal: 'auto',
        width: 400,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ListProductGrid;
