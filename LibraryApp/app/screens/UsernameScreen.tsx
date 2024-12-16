import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Hook para navegação com rotas

const UsernameScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const router = useRouter(); // Inicializa o router

    const handleViewUsers = () => {
        if (!username.trim()) {
            Alert.alert('Error', 'Insert username, please');
            return;
        }

        // Navegar para a próxima tela e passar o username como parâmetro
        router.push({
            pathname: '/UserLinkScreen', // Nome do arquivo da próxima tela
            params: { username }, // Passa o username como parâmetro
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Insert username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.button} onPress={handleViewUsers}>
                <Text style={styles.buttonText}>View Users</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UsernameScreen;
