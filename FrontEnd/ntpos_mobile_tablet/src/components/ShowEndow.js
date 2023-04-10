import React from 'react-native';
import { FlatList, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import ProductItem from './ProductItem'
import TitleButton from './TitleButton'
const ShowEndow = (props) => {
    return (
        <View>
            <TitleButton title={props.title} onPress={props.onPressDeteil} />
            <View style={styles.container}>
                <FlatList
                    data={props.data}
                    keyExtractor={(item, index) => 'key' + index}
                    pagingEnabled
                    scrollEnabled
                    horizontal={true}
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <ProductItem navigation={props.navigation} item={item} />
                    }}
                >
                </FlatList>
            </View>
        </View>

    );
}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        height: height / 3.5,
        marginBottom: 10,
    }
})
export default ShowEndow;