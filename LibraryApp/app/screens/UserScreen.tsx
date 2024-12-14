import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const UsersScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Users Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default UsersScreen;
