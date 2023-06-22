import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// Komponen Lokal
import { GetStarted } from "./src/screens/GetStarted";
import { MyTabs } from "./src/screens/(tabs)/Handler";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { NowThemeNav, NowPaperTheme, isDarkMode } from "./src/Colors&Themes";
import { StatusBar } from "expo-status-bar";

function App() {
    // alert(combinedTheme.colors.text);
    const [firstLaunch, setFirstLaunch] = React.useState(null);
    const Stack = createNativeStackNavigator();
    React.useEffect(() => {
        // async function setData() {
        //     const appData = await AsyncStorage.getItem("appLaunched");
        //     if (appData == null) {
        //         setFirstLaunch(true);
        //         AsyncStorage.setItem("appLaunched", "false");
        //     } else {
        //         setFirstLaunch(false);
        //     }
        // }
        // setData();
        setFirstLaunch(true);
    }, []);
    return (
        firstLaunch != null && (
            <PaperProvider theme={NowThemeNav}>
                <NavigationContainer theme={NowThemeNav}>
                    <Stack.Navigator>
                        {firstLaunch && <Stack.Screen name="Welcome" component={GetStarted} options={{ headerShown: false }} />}
                        <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    <StatusBar style={isDarkMode ? "light" : "dark"} />
                </NavigationContainer>
            </PaperProvider>
        )
    );
}

export default App;
