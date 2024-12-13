import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './Navigator'; // Import the type from your Navigator

export default function MainMenu() {
    // Properly type the navigation object
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LibrariesScreen')}>
                <Text style={styles.buttonText}>View Libraries</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsersScreen')}>
                <Text style={styles.buttonText}>View Users</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
