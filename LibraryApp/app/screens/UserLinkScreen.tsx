import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useSearchParams } from 'expo-router'; // Para acessar os parâmetros passados pela rota

interface Book {
    title: string;
    authors: { name: string }[];
    isbn: string;
}

interface LibraryBook {
    book: Book;
    libraryId: string;
    dueDate: string;
}

const UserLinkScreen: React.FC = () => {
    const { username } = useSearchParams(); // Pega o username passado como parâmetro
    const [books, setBooks] = useState<LibraryBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            fetchBooksByUser(username as string); // Certifique-se de que username é uma string
        } else {
            Alert.alert('Error', 'No username provided!');
            setLoading(false);
        }
    }, [username]);

    const fetchBooksByUser = async (username: string) => {
        try {
            const response = await fetch(`http://193.136.62.24/v1/books/user/${username}`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not fetch books for the user.');
        } finally {
            setLoading(false);
        }
    };

    const renderBook = ({ item }: { item: LibraryBook }) => {
        const { book } = item;
        return (
            <View style={styles.bookCard}>
                <Text style={styles.title}>Title: {book.title}</Text>
                <Text style={styles.author}>
                    Author: {book.authors?.[0]?.name || 'Unknown Author'}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Books associated with <Text style={styles.username}>{username}</Text>
            </Text>
            {loading ? (
                <Text style={styles.loading}>Loading...</Text>
            ) : books.length > 0 ? (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.book.isbn}
                    renderItem={renderBook}
                    contentContainerStyle={styles.list}
                />
            ) : (
                <Text style={styles.noBooks}>No books found for this user.</Text>
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    username: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    loading: {
        marginTop: 20,
        textAlign: 'center',
    },
    noBooks: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    list: {
        paddingVertical: 10,
    },
    bookCard: {
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
        marginBottom: 5,
    },
    author: {
        fontSize: 14,
        color: '#555',
    },
});

export default UserLinkScreen;
