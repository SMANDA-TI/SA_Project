import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Komponen Lokal
import { GetStarted } from "./src/screens/GetStarted";
import { MyTabs } from "./src/screens/(tabs)/Handler";

function App() {
    const Stack = createNativeStackNavigator();
    // Implementasi palsu
    const firstLoad = false;
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={firstLoad ? "Welcome" : "(tabs)"}>
                <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Welcome" component={GetStarted} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
