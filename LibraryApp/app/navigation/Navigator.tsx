import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from '../index';
import LibrariesScreen from '../screens/LibrariesScreen';
import UsersScreen from '../screens/UserScreen';

// Define the route params for type safety
export type RootStackParamList = {
    TabTwoScreen: undefined; // No parameters for this screen
    LibrariesScreen: undefined; // No parameters for this screen
    UsersScreen: undefined; // No parameters for this screen
};

const Stack = createStackNavigator<RootStackParamList>(); // Pass the type to the stack

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="TabTwoScreen" component={MainMenu} />
                <Stack.Screen name="LibrariesScreen" component={LibrariesScreen} />
                <Stack.Screen name="UsersScreen" component={UsersScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
