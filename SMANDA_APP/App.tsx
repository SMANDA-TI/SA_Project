import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Komponen Lokal
import { GetStarted } from "./src/screens/GetStarted";
import { RootStackScreen } from "./src/types/NavigationType";
import { HomeScreen } from "./src/screens/Home";
import { DetailsScreen } from "./src/screens/Details";

function App() {
    const Stack = createNativeStackNavigator<RootStackScreen>();
    // Implementation
    const firstLoad = true;
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={firstLoad ? "Welcome" : "Home"}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Welcome" component={GetStarted} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
