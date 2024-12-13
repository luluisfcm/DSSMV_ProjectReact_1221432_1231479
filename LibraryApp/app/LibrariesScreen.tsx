import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';

const LibraryScreen = () => {
    const [data, setData] = useState(null); // State to store the fetched data
    const [loading, setLoading] = useState(false); // State to handle loading state

    const handlePress = async () => {
        setLoading(true); // Show the loading indicator
        try {
            const response = await fetch('http://193.136.62.24/v1/library'); // Fetch data
            const json = await response.json(); // Parse the JSON response
            setData(json); // Save data in state
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar os dados.'); // Show an error message
        } finally {
            setLoading(false); // Hide the loading indicator
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Carregar Dados da Biblioteca" onPress={handlePress} />
            {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
            {data && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    loading: {
        marginTop: 20,
    },
    dataContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxHeight: '50%',
        width: '90%',
        overflow: 'hidden',
    },
    dataText: {
        fontSize: 14,
        color: '#333',
    },
});

export default LibraryScreen;
