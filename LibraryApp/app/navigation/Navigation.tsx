import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibrariesScreen from '../screens/LibrariesScreen';
import MainMenu from "@/app/screens/MainMenu";
import LibraryBookScreen from "@/app/screens/LibraryBookScreen";
import UsernameScreen from "@/app/screens/UsernameScreen";
import UserLinkScreen from "@/app/screens/UserLinkScreen";

const Stack = createStackNavigator();

const Navigation: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator>
            {/* Define unique names and appropriate titles for each screen */}
            <Stack.Screen name="Libraries" component={LibrariesScreen} options={{ title: 'Libraries' }} />
            <Stack.Screen name="Username" component={UsernameScreen} options={{ title: 'Users' }} />
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Menu' }} />
            <Stack.Screen name="LibraryBook" component={LibraryBookScreen} options={{ title: 'Library Books' }} />
            <Stack.Screen name="UserLink" component={UserLinkScreen} options={{ title: 'UserBooks' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;
