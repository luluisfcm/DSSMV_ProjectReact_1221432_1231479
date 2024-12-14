import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Alert,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Accelerometer } from 'expo-sensors'; // Usando a API de sensores do Expo

// Interface para os dados da biblioteca
interface Library {
    id: string;
    name: string;
    address: string;
    openTime: string;
    closeTime: string;
    openDays: string;
}

const LibrariesScreen: React.FC = () => {
    const [data, setData] = useState<Library[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLibrary, setNewLibrary] = useState({
        name: '',
        address: '',
        openTime: '',
        closeTime: '',
        openDays: ''
    });
    const navigation = useNavigation();

    // Função para buscar os dados
    const fetchLibraries = async () => {
        try {
            const response = await fetch('http://193.136.62.24/v1/library');
            const json: Library[] = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
        } finally {
            setLoading(false);
        }
    };

    // Função para adicionar uma nova biblioteca
    const addLibrary = async () => {
        const { name, address, openTime, closeTime, openDays } = newLibrary;

        if (!name || !address || !openTime || !closeTime || !openDays) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://193.136.62.24/v1/library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLibrary)
            });

            if (response.ok) {
                const addedLibrary = await response.json();
                setData(prevData => (prevData ? [addedLibrary, ...prevData] : [addedLibrary]));
                Alert.alert('Sucesso', 'Biblioteca adicionada com sucesso!');
                setModalVisible(false);
                setNewLibrary({ name: '', address: '', openTime: '', closeTime: '', openDays: '' });
                fetchLibraries();
            } else {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.message || 'Erro ao adicionar biblioteca.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao adicionar biblioteca.');
        }
    };

    useEffect(() => {
        fetchLibraries();

        // Função para detectar o movimento de agitar o telefone
        const subscription = Accelerometer.addListener(accelerometerData => {
            const { x, y, z } = accelerometerData;

            // Lógica para detectar o movimento de agitar o telefone (exemplo simples)
            if (Math.abs(x) > 2 || Math.abs(y) > 2 || Math.abs(z) > 2) {
                setModalVisible(true); // Abre o modal quando o telefone for agitado
            }
        });

        // Começa a ouvir os dados do acelerômetro
        Accelerometer.setUpdateInterval(100); // Intervalo de atualização do acelerômetro

        // Cleanup
        return () => {
            subscription.remove();
        };
    }, []);

    const renderCard = ({ item }: { item: Library }) => (
        <TouchableOpacity
            style={styles.card}
            onLongPress={() => {
                Alert.alert(
                    "Ações",
                    `Escolha uma ação para "${item.name}"`,
                    [
                        {
                            text: "Editar",
                            onPress: () => {
                                // Implementar lógica de edição
                            },
                        },
                        {
                            text: "Excluir",
                            onPress: () => {
                                // Implementar lógica de exclusão
                            },
                            style: "destructive",
                        },
                        {
                            text: "Cancelar",
                            style: "cancel",
                        },
                    ],
                    { cancelable: true }
                );
            }}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <Text style={styles.details}>Horário: {item.openTime} - {item.closeTime}</Text>
            <Text style={styles.details}>Dias: {item.openDays}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCard}
                    contentContainerStyle={styles.list}
                />
            )}

            {/* Botão flutuante para abrir o modal manualmente */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Modal para adicionar biblioteca */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Adicionar Biblioteca</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#999"
                        value={newLibrary.name}
                        onChangeText={(text) => setNewLibrary({ ...newLibrary, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Endereço"
                        placeholderTextColor="#999"
                        value={newLibrary.address}
                        onChangeText={(text) => setNewLibrary({ ...newLibrary, address: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Horário de Abertura"
                        placeholderTextColor="#999"
                        value={newLibrary.openTime}
                        onChangeText={(text) => setNewLibrary({ ...newLibrary, openTime: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Horário de Fechamento"
                        placeholderTextColor="#999"
                        value={newLibrary.closeTime}
                        onChangeText={(text) => setNewLibrary({ ...newLibrary, closeTime: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Dias de Funcionamento"
                        placeholderTextColor="#999"
                        value={newLibrary.openDays}
                        onChangeText={(text) => setNewLibrary({ ...newLibrary, openDays: text })}
                    />

                    <View style={styles.buttonRow}>
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                        <Button title="Adicionar" onPress={addLibrary} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
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
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    details: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
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
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6200ee',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    fabText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});

export default LibrariesScreen;