import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {router} from "expo-router";

// Interface for the author data
interface Author {
    name: string;
}

// Interface for the cover data
interface Cover {
    largeUrl: string;
    mediumUrl: string;
    smallUrl: string;
}

// Interface for the book data
interface Book {
    isbn: string;      // ISBN of the book (unique identifier)
    title: string;     // Title of the book
    authors: Author[]; // List of authors
    cover: Cover;      // Cover URLs
    available: number; // 0 = Not available, 1 = Available
}

const LibraryBookScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id: libraryId } = route.params as { id: string }; // Retrieve the library ID from route params

    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    // Function to fetch books from the library
    const fetchBooks = async () => {
        try {
            const response = await fetch(`http://193.136.62.24/v1/library/${libraryId}/book`);
            const json: any[] = await response.json();

            // Map the API response to match the Book interface
            const booksData: Book[] = json.map(item => ({
                isbn: item.isbn,
                title: item.book.title,
                authors: item.book.authors.map((author: any) => ({ name: author.name })),
                cover: item.book.cover,
                available: item.available, // Assuming 0 means not available, 1 means available
            }));

            setBooks(booksData);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to fetch books.');
        } finally {
            setLoading(false);
        }
    };

    const renderBook = ({ item }: { item: Book }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: './BookDetailsScreen', params: { isbn: item.isbn }})}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Author: {item.authors.map(a => a.name).join(', ')}</Text>
            <Text style={[styles.status, { color: item.available > 0 ? '#28a745' : '#dc3545' }]}>
                {item.available > 0 ? `${item.available} Available` : 'Not Available'}
            </Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : books && books.length > 0 ? (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.isbn} // Use ISBN as the unique key
                    renderItem={renderBook}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.noData}>No books available for this library.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
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
    loading: {
        marginTop: 20,
    },
    list: {
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    author: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
    },
    noData: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LibraryBookScreen;
