import { useState, useEffect, useRef } from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Komponen Lokal
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { GetStarted } from "./screens/GetStarted";
import { MyTabs } from "./screens/(tabs)/Handler";
import { PaperProvider, configureFonts } from "react-native-paper";
import {
    CombinedDarkTheme,
    CombinedDefaultTheme,
    PaperDarkThemeCombined,
    PaperLightThemeCombined,
} from "./Colors&Themes";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch } from "./context/hooks";
// import { useFonts } from "expo-font";
import {
    useFonts,
    SignikaNegative_400Regular,
    SignikaNegative_300Light,
    SignikaNegative_500Medium,
    SignikaNegative_600SemiBold,
    SignikaNegative_700Bold,
} from "@expo-google-fonts/signika-negative";
import * as SplashScreen from "expo-splash-screen";
import WordPressStack from "./screens/(wordpress)/Handler";
import SearchStack from "./screens/(search)/Handler";
import { RootStackScreenList } from "./types/RootType";
import { getDarkMode, getTheme, toggleTheme } from "./context/Slicer/GlobalEnvironment";
import {
    saveWPArtikelLatest,
    saveWPGuru,
    saveWPS_slides,
    saveWPArtikel,
    saveWPEksul,
    saveWPYoutube,
    saveWPOrganisasi,
    saveWPPostPenting,
    saveWPPosts,
} from "./context/Slicer/WordpressProvider";
SplashScreen.preventAutoHideAsync();

export function Main() {
    const [AppReady, setAppReady] = useState(false);
    const dispatch = useAppDispatch();
    const isDarkMode = getDarkMode();
    const getTema = getTheme();
    const [firstLaunch, setFirstLaunch] = useState(null);
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
        dispatch(saveWPS_slides("s_slides"));
        dispatch(saveWPPosts("allPost"));
        dispatch(saveWPArtikelLatest("artikelLatest"));
        dispatch(saveWPGuru("guru"));
        dispatch(saveWPYoutube("youtube"));
        dispatch(saveWPEksul("eksul"));
        dispatch(saveWPOrganisasi("organisasi"));
        dispatch(saveWPPostPenting("post_penting"));
    }, []);
    const Stack = createNativeStackNavigator<RootStackScreenList>();
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
    const checkFontLoaded = async () => {
        console.log(fontsLoaded);
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
            setAppReady(true);
        }
    };

    useEffect(() => {
        checkFontLoaded();
    }, [fontsLoaded]);

    // Control Initialization Theme
    useEffect(() => {
        const restorePreferences = async () => {
            try {
                const prefString = await AsyncStorage.getItem("APP_PREFERENCES");
                const preferences = JSON.parse(prefString || "");
                if (preferences && preferences.theme === "dark") {
                    dispatch(toggleTheme());
                }
            } catch (e) {
                // Ignore the error
            }
        };

        restorePreferences();
    }, []);

    const themeMode = isDarkMode ? "dark" : "light";

    // Kontrol Save Theme CONFIG ke Device Storage-nya
    useEffect(() => {
        const savePrefs = async () => {
            try {
                await AsyncStorage.setItem(
                    "APP_PREFERENCES",
                    JSON.stringify({
                        theme: getTema,
                    })
                );
            } catch (e) {
                // ignore error
            }
        };
        savePrefs();
    }, [themeMode]);

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

    const combinedTheme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

    const PaperTheme = {
        ...combinedTheme,
        fonts: configureFonts({ config: fontConfig as object }),
    };
    const navigationRef = useNavigationContainerRef();
    const [isInCustomHeader, setInCustomHeader] = useState(false);
    return (
        AppReady &&
        firstLaunch != null && (
            <PaperProvider theme={PaperTheme}>
                <NavigationContainer
                    theme={combinedTheme}
                    ref={navigationRef}
                    onStateChange={async () => {
                        console.log(navigationRef.getCurrentRoute().name);
                        if (
                            navigationRef.getCurrentRoute().name.startsWith("Post") ||
                            navigationRef.getCurrentRoute().name.startsWith("Guru")
                        ) {
                            setInCustomHeader(true);
                            // } else if (navigationRef.getCurrentRoute().name.startsWith("Search")) {
                            //     setInCustomHeader(true);
                        } else isInCustomHeader == true && setInCustomHeader(false);
                    }}>
                    <Stack.Navigator>
                        {firstLaunch && (
                            <>
                                <Stack.Screen
                                    name="GetStarted"
                                    component={GetStarted}
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="Welcome"
                                    component={WelcomeScreen}
                                    options={{ headerShown: false }}
                                />
                            </>
                        )}

                        <Stack.Screen
                            name="(tabs)"
                            component={MyTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(wordpress)"
                            component={WordPressStack}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(search)"
                            component={SearchStack}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                    <StatusBar
                        style={isInCustomHeader ? "light" : isDarkMode ? "light" : "dark"}
                        animated
                    />
                </NavigationContainer>
            </PaperProvider>
        )
    );
}
