import { useState, useReducer, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Komponen Lokal
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { GetStarted } from "./screens/GetStarted";
import { MyTabs } from "./screens/(tabs)/Handler";
import { PaperProvider, Text } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme, PaperDarkThemeCombined, PaperLightThemeCombined } from "./Colors&Themes";
import { StatusBar } from "expo-status-bar";
import { useGlobals } from "./context/RootContext";

export function Main() {
    const { state, dispatch } = useGlobals();
    console.log("INFORMATION: ", state);
    const [firstLaunch, setFirstLaunch] = useState(null);
    const Stack = createNativeStackNavigator();

    // Kontrol FirstLaunching
    useEffect(() => {
        // Uncomment di produksi Environment
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
        // Comment di produksi Environment
        setFirstLaunch(true);
    }, []);

    // Kontrol IntisialisasiTheme
    useEffect(() => {
        const restorePrefs = async () => {
            try {
                const prefString = await AsyncStorage.getItem("APP_PREFERENCES");
                const preferences = JSON.parse(prefString || "");
                if (preferences) {
                    if (preferences.theme === "dark") {
                        dispatch({ type: "GoDark" });
                    }
                }
            } catch (e) {
                // ignore error-nyah
            }
        };
        restorePrefs();
    }, []);

    const themeMode = state.isDarkMode ? "dark" : "light";

    // Kontrol Save Theme CONFIG ke Device Storage-nya
    useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(
                    "APP_PREFERENCES",
                    JSON.stringify({
                        theme: state.theme,
                    })
                );
            } catch (e) {
                // ignore error
            }
        };
        savePrefs();
    }, [themeMode]);
    const themePaper = {
        light: PaperLightThemeCombined,
        dark: PaperDarkThemeCombined,
    }[themeMode];

    const combinedTheme = state.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
    return (
        firstLaunch != null && (
            <PaperProvider theme={combinedTheme}>
                <NavigationContainer theme={combinedTheme}>
                    <Stack.Navigator>
                        {firstLaunch && (
                            <>
                                <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
                                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                            </>
                        )}

                        <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    <StatusBar style={state.isDarkMode ? "light" : "dark"} />
                </NavigationContainer>
            </PaperProvider>
        )
    );
}
