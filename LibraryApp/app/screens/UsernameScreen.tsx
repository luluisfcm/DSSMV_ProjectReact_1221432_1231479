import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; // Importando o hook de navegação

const UsernameScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation(); // Usando o hook para navegação

    const handleViewUsers = () => {
        if (!username.trim()) {
            Alert.alert('Error', 'Insert username, please');
            return;
        }

        // Navegar para a próxima tela passando o nome de usuário
        router.push({
            pathname: './UserLinkScreen',
            params: { username }, // Envia o nome de usuário como parâmetro
        });
    };

    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} // Vai para a tela anterior
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UsernameScreen;
