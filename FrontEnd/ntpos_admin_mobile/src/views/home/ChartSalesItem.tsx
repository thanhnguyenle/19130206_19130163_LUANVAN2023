import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { COLORS } from '../../constants/common';
import homeStore from '../../store/HomeStore';
type Data = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
};

type ChartConfig = {
    backgroundColor: string;
    backgroundGradientFrom: string;
    backgroundGradientTo: string;
    decimalPlaces: number;
    color: (opacity: number) => string;
};



const chartConfig: ChartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
};

const MyPieChart = () => {
    homeStore.updateRevenue();
    const initialData: Data[] = [
        {
            name: 'Giá nguyên liệu',
            population: homeStore.cost_of_capital,
            color: '#FFCD5680',
            legendFontColor: '#000',
            legendFontSize: 12,
        },
        {
            name: 'Lợi nhuận',
            population: homeStore.profit,
            color: '#FF638470',
            legendFontColor: '#000',
            legendFontSize: 12,
        },
    ];
    const handleDataChange = () => {
        homeStore.updateRevenue();
    };
    return (
        <View style={styles.revenue}>
            <View style={styles.boxTitle}>
                <Text style={styles.title}>Doanh thu</Text>
                <TouchableOpacity onPress={handleDataChange}>
                    <Text>Cập nhật</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 6, marginRight: 6 }}>
                <PieChart
                    data={initialData}
                    width={responsiveWidth(90)}
                    height={responsiveHeight(30)}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    absolute
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    revenue: {
        marginTop: 10,
        backgroundColor: COLORS.color_white,
        marginBottom: 5,
        elevation: 1,
        marginLeft: 1,
        marginRight: 1,
    },
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: responsiveFontSize(3),
        elevation: 1,
        color: COLORS.color_black,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
})
export default MyPieChart;
