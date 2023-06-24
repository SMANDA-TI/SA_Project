import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Komponen Lokal
import { GetStarted } from "./src/screens/GetStarted";
import { MyTabs } from "./src/screens/(tabs)/Handler";
import { PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme, PaperDarkThemeCombined, PaperLightThemeCombined } from "./src/Colors&Themes";
import { StatusBar } from "expo-status-bar";
import { Props } from "./src/types/RootType";
// import { registerRootComponent } from "expo";
export const PreferencesContext = React.createContext<any>(null);

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
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    React.useEffect(() => {
        const restorePrefs = async () => {
            try {
                const prefString = await AsyncStorage.getItem("APP_PREFERENCES");
                const preferences = JSON.parse(prefString || "");

                if (preferences) {
                    setIsDarkMode(preferences.theme === "dark");
                }
            } catch (e) {
                // ignore error
            }
        };

        restorePrefs();
    }, []);
    const themeMode = isDarkMode ? "dark" : "light";
    React.useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(
                    "APP_PREFERENCES",
                    JSON.stringify({
                        theme: themeMode,
                    })
                );
            } catch (e) {
                // ignore error
            }
        };
        savePrefs();
    }, [themeMode]);
    const theme = {
        light: PaperLightThemeCombined,
        dark: PaperDarkThemeCombined,
    }[themeMode];
    const preferences = React.useMemo(
        (): Props => ({
            toggleTheme: () => setIsDarkMode((oldValue) => !oldValue),
            isDarkMode,
        }),
        [theme]
    );
    const reducer = (state, action) => {
        switch (action.type) {
            case "switchTheme":
                return {
                    ...state,
                    theme: action.theme,
                };
            default:
                return {
                    ...state,
                };
        }
    };

    const initialState = {
        theme: "light",
        showLoader: false,
    };
    // const preferencesRed = React.useReducer(reducer, initialState);
    const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
    return (
        firstLaunch != null && (
            <PreferencesContext.Provider
                value={
                    preferences
                    // preferencesRed
                }>
                <PaperProvider theme={combinedTheme}>
                    <NavigationContainer theme={combinedTheme}>
                        <Stack.Navigator>
                            {firstLaunch && <Stack.Screen name="Welcome" component={GetStarted} options={{ headerShown: false }} />}
                            <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }} />
                        </Stack.Navigator>
                        <StatusBar style={isDarkMode ? "light" : "dark"} />
                    </NavigationContainer>
                </PaperProvider>
            </PreferencesContext.Provider>
        )
    );
}

export default App;
// registerRootComponent(App);
