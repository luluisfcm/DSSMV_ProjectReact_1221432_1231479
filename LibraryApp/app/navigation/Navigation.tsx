import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../screens/UserScreen'; // Corrija o caminho se necessário
import LibrariesScreen from '../screens/LibrariesScreen';
import UsersScreen from '../screens/UserScreen';

// Definição do tipo para as rotas
export type RootStackParamList = {
    TabTwoScreen: undefined;
    LibrariesScreen: undefined;
    UsersScreen: undefined;
};
//asdasd

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TabTwoScreen">
                <Stack.Screen name="TabTwoScreen" component={MainMenu} options={{ title: 'Main Menu' }} />
                <Stack.Screen name="LibrariesScreen" component={LibrariesScreen} options={{ title: 'Libraries' }} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} options={{ title: 'Users' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
