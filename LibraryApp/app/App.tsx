import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './screens/MainMenu'; // Certifique-se do caminho correto
import LibrariesScreen from './screens/LibrariesScreen'; // Certifique-se do caminho correto
import UsersScreen from './screens/UserScreen'; // Certifique-se do caminho correto

// Definição das rotas para o React Navigation
export type RootStackParamList = {
    MainMenu: undefined;
    LibrariesScreen: undefined;
    UsersScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainMenu">
                <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Main Menu' }} />
                <Stack.Screen name="LibrariesScreen" component={LibrariesScreen} options={{ title: 'Libraries' }} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} options={{ title: 'Users' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
