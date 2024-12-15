import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Alert, TouchableOpacity } from 'react-native';
import {useEffect, useState} from "react";

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

const UserLinkScreen: React.FC<{ route: any }> = ({ route }) => {
    const { username } = route.params; // Garante que o "username" é recuperado dos parâmetros
    const [books, setBooks] = useState<LibraryBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            fetchBooksByUser(username);
        }
    }, [username]);

    const fetchBooksByUser = async (username: string) => {
        try {
            const response = await fetch(`http://193.136.62.24/v1/books/user/${username}`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível buscar os livros.');
        } finally {
            setLoading(false);
        }
    };

    const renderBook = ({ item }: { item: LibraryBook }) => {
        const { book } = item;
        return (
            <View style={styles.bookCard}>
                <Text style={styles.title}>Título: {book.title}</Text>
                <Text style={styles.author}>
                    Autor: {book.authors?.[0]?.name || 'Autor desconhecido'}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Livros associados a {username}</Text>
            {loading ? (
                <Text style={styles.loading}>Carregando...</Text>
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item, index) => `${item.book.isbn}-${index}`}
                    renderItem={renderBook}
                    contentContainerStyle={styles.list}
                />
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
    loading: {
        marginTop: 20,
        textAlign: 'center',
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
