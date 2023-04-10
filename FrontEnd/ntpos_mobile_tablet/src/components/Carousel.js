import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import { COLORS } from '../constants/common'
import CarouselCardItem from './CarouselItem'

const { width, heigth } = Dimensions.get('window')
let flatList
function infiniteScroll(dataList) {
    const numberOfData = dataList.length;
    let scrollValue = 0, scrolled = 0;
    setInterval(function () {
        scrolled++;
        if (scrolled < numberOfData) {
            scrollValue = scrollValue + width
        } else {
            scrollValue = 0;
            scrolled = 0;
        }
        this.flatList.scrollToOffset({ animated: true, offset: scrollValue })
    }, 4000)
}
const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)
    useEffect(() => {
        setDataList(data)
        infiniteScroll(dataList)
    })
    if (data && data.length) {
        return (
            <View>
                <FlatList data={data}
                    ref={(flatList) => { this.flatList = flatList }}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment='center'
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CarouselCardItem item={item} />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                    )}
                />
                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{ opacity, height: 6, width: 6, backgroundColor: COLORS.darkGreen, margin: 4, borderRadius: 5 }}
                            />
                        )
                    })}
                </View>
            </View>
        );
    }
    console.log('Please provide Images')
    return null
}
const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -35
    }
})
export default Carousel;
