import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
} from 'react-native';
import ItemCategory from './ItemCategory';

const { width, height } = Dimensions.get('window');

interface CarouseCategoryProps {
    data: any[];
}

const CarouseCategory: React.FC<CarouseCategoryProps> = ({ data }) => {
    if (data && data.length) {
        return (
            <View style={styles.cardView}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={data}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <ItemCategory item={item} />;
                    }}
                />
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    cardView: {
        height: 120,
        marginTop: 10,
    },
});

export default CarouseCategory;
