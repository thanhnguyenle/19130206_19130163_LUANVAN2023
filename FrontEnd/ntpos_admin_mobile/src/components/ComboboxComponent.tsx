import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../constants/common';

interface Option {
    label: string;
    value: string;
}

interface ComboBoxProps {
    options: Option[];
    onSelect: (item: Option) => void;
    title: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onSelect, title }) => {
    const [selectedValue, setSelectedValue] = useState<Option | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (item: Option) => {
        setSelectedValue(item);
        setModalVisible(false);
        onSelect(item);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.selectedValue} onPress={() => setModalVisible(true)}>
                <Text>{selectedValue ? selectedValue.label : 'Chọn'}</Text>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent>
                <Text style={{ padding: 10, fontSize: 25, color: COLORS.color_grey, backgroundColor: COLORS.color_white }}>{title}</Text>
                <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                                <Text>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.darkGreen,
        elevation: 1,
    },
    selectedValue: {
        padding: 10,
    },
    modalContainer: {
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    option: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ComboBox;
