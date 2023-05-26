import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';

interface SearchBarProps {
    isEnter: boolean;
    value: string;
    updateSearch: (value: string) => void;
    style?: object;
    navigation: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ isEnter, updateSearch, style, navigation, value }) => {
    const inputTextRef = useRef<TextInput>(null);
    const [query, setQuery] = useState<string>(value);
    return (
        <View style={[styles.container, style]} ref={inputTextRef}>
            <TextInput
                ref={inputTextRef}
                editable={isEnter}
                value={query}
                style={styles.input}
                placeholder="Tìm kiếm"
                onChangeText={(text) => {
                    setQuery(text);
                    updateSearch(text);
                }}
            />
            {query ? (
                <TouchableOpacity onPress={() => setQuery('')}>
                    <Iconicons name="close" size={24} style={styles.icon} />
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SearchScreen');
                }}>
                <Iconicons name="search" size={24} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        margin: 10,
        borderColor: '#C0C0C0',
        borderRadius: 50,
        height: 40,
        color: '#808080',
    },
    input: {
        fontSize: 16,
        marginLeft: 10,
        width: '80%',
        color: '#808080',
    },
    icon: {
        marginRight: 10,
        color: '#808080',
    },
});
