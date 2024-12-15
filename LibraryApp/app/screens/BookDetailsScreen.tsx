import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Component to display book details
const BookDetailsScreen: React.FC = () => {
    // Get the ISBN passed from the previous screen
    const route = useRoute();
    const navigation = useNavigation();  // Access the navigation object
    const { isbn } = route.params as { isbn: string }; // Destructure ISBN from params

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}  // Use navigation to go back
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Book ISBN</Text>
            <Text style={styles.isbn}>{isbn}</Text> {/* Display the ISBN */}
        </View>
    );
};

// Basic styling
const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    isbn: {
        fontSize: 20,
        color: '#333',
    },
});

export default BookDetailsScreen;
