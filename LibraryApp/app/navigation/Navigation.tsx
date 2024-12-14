import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibrariesScreen from '../screens/LibrariesScreen';
import UsersScreen from "@/app/screens/UserScreen";
import MainMenu from "@/app/screens/MainMenu";

const Stack = createStackNavigator();

const Navigation: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Libraries" component={LibrariesScreen} />
                <Stack.Screen name="LibrariesScreen" component={LibrariesScreen} options={{ title: 'Libraries' }} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} options={{ title: 'Users' }} />
                <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu' }} />
        </Stack.Navigator>
    </NavigationContainer>
);
export default Navigation;
