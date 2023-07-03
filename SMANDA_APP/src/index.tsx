import { useState, useEffect, useRef } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Komponen Lokal
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { GetStarted } from "./screens/GetStarted";
import { MyTabs } from "./screens/(tabs)/Handler";
import { PaperProvider, configureFonts } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme, PaperDarkThemeCombined, PaperLightThemeCombined } from "./Colors&Themes";
import { StatusBar } from "expo-status-bar";
import { useGlobals } from "./context/RootContext";
import FetchResourceWP from "./backend/FetchPosts";
// import { useFonts } from "expo-font";
import {
    useFonts,
    SignikaNegative_400Regular,
    SignikaNegative_300Light,
    SignikaNegative_500Medium,
    SignikaNegative_600SemiBold,
    SignikaNegative_700Bold,
} from "@expo-google-fonts/dev";
import * as SplashScreen from "expo-splash-screen";
import Handler from "./screens/(post)/Handler";
SplashScreen.preventAutoHideAsync();

export function Main() {
    const [AppReady, setAppReady] = useState(false);
    const { state, dispatch } = useGlobals();
    console.log("INFORMATION: ", state);
    const [firstLaunch, setFirstLaunch] = useState(null);
    const Stack = createNativeStackNavigator();

    // const SPaperFonts = {
    //     "Belanosima-Bold": require("../assets/fonts/Belanosima-Bold.ttf"),
    //     "Belanosima-Regular": require("../assets/fonts/Belanosima-Regular.ttf"),
    //     "Belanosima-SemiBold": require("../assets/fonts/Belanosima-SemiBold.ttf"),
    // };
    const SGugelFonts = {
        SNL: SignikaNegative_300Light,
        SNR: SignikaNegative_400Regular,
        SNM: SignikaNegative_500Medium,
        SNSB: SignikaNegative_600SemiBold,
        SNB: SignikaNegative_700Bold,
    };
    const [fontsLoaded] = useFonts(SGugelFonts);
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
    useEffect(() => {
        async function Check() {
            console.log(fontsLoaded);
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                setAppReady(true);
            }
        }
        Check();
    }, [fontsLoaded]);

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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await FetchResourceWP("artikel");
                // console.log(data);
                if (data) {
                    dispatch({ type: "populatePostArtikel", payload: data });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, []);

    const fontConfig = {
        bodyLarge: {
            fontFamily: "SNB",
        },
        bodySmall: {
            fontFamily: "SNL",
        },
        bodyMedium: {
            fontFamily: "SNR",
        },
        displayLarge: {
            fontFamily: "SNB",
        },
        displaySmall: {
            fontFamily: "SNL",
        },
        displayMedium: {
            fontFamily: "SNM",
            fontWeight: "bold",
        },
        headlineLarge: {
            fontFamily: "SNB",
        },
        headlineSmall: {
            fontFamily: "SNL",
        },
        headlineMedium: {
            fontFamily: "SNM",
        },
        titleLarge: {
            fontFamily: "SNB",
        },
        titleSmall: {
            fontFamily: "SNL",
        },
        titleMedium: {
            fontFamily: "SNM",
        },
        labelLarge: {
            fontFamily: "SNB",
        },
        labelSmall: {
            fontFamily: "SNL",
        },
        labelMedium: {
            fontFamily: "SNR",
        },
        default: {
            fontFamily: "SNR",
        },
        regular: {
            fontFamily: "SNR",
        },
        medium: {
            fontFamily: "SNM",
        },
        light: {
            fontFamily: "SNL",
        },
        thin: {
            fontFamily: "SNL",
        },
    };

    const combinedTheme = state.isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

    const PaperTheme = { ...combinedTheme, fonts: configureFonts({ config: fontConfig as object }) };
    const navigationRef = useNavigationContainerRef();
    const [isInPost, setInPost] = useState(false);
    return (
        AppReady &&
        firstLaunch != null && (
            <PaperProvider theme={PaperTheme}>
                <NavigationContainer
                    theme={combinedTheme}
                    ref={navigationRef}
                    onStateChange={async () => {
                        if (navigationRef.getCurrentRoute().name.startsWith("Post")) {
                            setInPost(true);
                        } else isInPost == true && setInPost(false);
                    }}>
                    <Stack.Navigator>
                        {firstLaunch && (
                            <>
                                <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
                                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                            </>
                        )}

                        <Stack.Screen name="(tabs)" component={MyTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="(post)" component={Handler} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    <StatusBar style={isInPost ? "light" : state.isDarkMode ? "light" : "dark"} animated />
                </NavigationContainer>
            </PaperProvider>
        )
    );
}
