import Onboarding from "react-native-onboarding-swiper";
import { Image, View, Platform } from "react-native";
import { RootStackScreenProps } from "../types/RootType";
import { Button, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as NavigationBar from "expo-navigation-bar";

interface CustomOnboardingRef extends Onboarding {
    state: {
        currentPage: number;
        backgroundColorAnim: number;
        height: number;
        previousPage: number;
        width: number;
    };
    goToPage: (currentPage, animated) => void;
}
type NavigationProps = RootStackScreenProps<"Welcome">;

const APP_LOGO = require("../../assets/images/Profile_Logo_SMANDA_APP.png");
export function WelcomeScreen(navigasi: RootStackScreenProps<"Welcome">) {
    const tema = useTheme();
    // const nav = useNavigation<typeUseNavigation>();
    // const nav = useNavigation<typeUseNavigation>();
    const onboardingRef = useRef<CustomOnboardingRef>(null);
    function PrevButton({ ...props }) {
        const currentPage = onboardingRef?.current?.state?.currentPage;
        return (
            (currentPage != null && currentPage != 0 && (
                // true
                <Button
                    {...props}
                    icon={({ size, color }) => <MaterialCommunityIcons name="chevron-left" size={22} color={color} />}
                    // contentStyle={{ flexDirection: "row-reverse" }}
                    mode="text"
                    style={{ borderRadius: 10, paddingLeft: 10 }}
                    uppercase={true}
                    labelStyle={{ color: tema.colors.onSurfaceVariant, marginLeft: 10 }}
                    onPress={() => {
                        onboardingRef.current.goToPage(currentPage - 1, true);
                    }}>
                    Previous
                </Button>
            )) ||
            (currentPage == 0 && <SkipButton />)
        );
    }
    function SkipButton({ ...props }) {
        return (
            <Button
                {...props}
                icon={({ size, color }) => <MaterialCommunityIcons name="chevron-right" size={22} color={color} />}
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="text"
                style={{ borderRadius: 10, marginLeft: 10 }}
                uppercase={true}
                // labelStyle={{ color: "rgb(46, 138, 239)" }}
                labelStyle={{ color: tema.colors.onSurfaceVariant }}
                onPress={() => {
                    navigasi.navigation.replace("(tabs)");
                }}>
                Skip
            </Button>
        );
    }
    function DoneButton({ ...props }) {
        return (
            <Button
                {...props}
                icon={({ size, color }) => <MaterialCommunityIcons name="check-all" size={22} color={color} />}
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="text"
                style={{ borderRadius: 10, marginRight: 10 }}
                labelStyle={{ color: tema.colors.onSurfaceVariant }}
                uppercase={true}>
                Done
            </Button>
        );
    }
    function NextButton({ ...props }) {
        return (
            <Button
                {...props}
                icon={({ size, color }) => <MaterialCommunityIcons name="chevron-right" size={22} color={color} />}
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="text"
                style={{ borderRadius: 10, paddingRight: 10 }}
                labelStyle={{ color: tema.colors.onSurfaceVariant }}
                uppercase={true}>
                Next
            </Button>
        );
    }

    function Square({ selected }) {
        // const tema = useTheme();
        const backgroundColor = selected ? tema.colors.onSurfaceVariant : "rgba(0, 0, 0, 0.24)";
        return (
            <View
                style={{
                    width: selected ? 20 : 6,
                    height: 6,
                    marginHorizontal: 3,
                    backgroundColor,
                    borderRadius: 3,
                }}
            />
        );
    }
    // useEffect(() => {
    //     async () => {
    //         if (Platform.OS == "android") {
    //             try {
    //                 await NavigationBar.setBackgroundColorAsync(tema.colors.elevation.level2);
    //                 await NavigationBar.setBorderColorAsync("transparent");
    //                 await NavigationBar.setButtonStyleAsync(tema.dark ? "light" : "dark");
    //             } catch (e) {
    //                 // ignore error
    //             }
    //         } else return;
    //     };
    // }, [tema]);
    return (
        <SafeAreaView edges={["left", "right", "bottom"]} style={{ flex: 1, backgroundColor: tema.colors.elevation.level2 }}>
            <Onboarding
                ref={onboardingRef}
                DotComponent={Square}
                onDone={() => navigasi.navigation.replace("(tabs)")}
                // onSkip={() => props.navigation.replace("(tabs)")}
                SkipButtonComponent={PrevButton}
                NextButtonComponent={NextButton}
                DoneButtonComponent={DoneButton}
                bottomBarColor={tema.colors.elevation.level2}
                // pageIndexCallback={(pageIndex) => {
                //     if (pageIndex == 2) {
                //         return (
                //             <View>
                //                 <Text>Naon</Text>
                //             </View>
                //         );
                //     }
                // }}
                pages={[
                    {
                        backgroundColor: tema.colors.background,
                        image: (
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: 100,
                                    width: 200,
                                }}
                                source={APP_LOGO}
                            />
                        ),
                        title: (
                            <Text variant="headlineMedium" style={{ paddingTop: 0, marginTop: 0, paddingBottom: 15 }}>
                                Selamat Datang 👋!
                            </Text>
                        ),
                        subtitle: "Selamat Datang di Aplikasi Mobile SMAN 2 Kuningan. ✨",
                    },
                    {
                        backgroundColor: tema.colors.background,
                        image: (
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: 100,
                                    width: 200,
                                }}
                                source={APP_LOGO}
                            />
                        ),
                        title: "Smanda App",
                        subtitle: "Aplikasi ini bertujuan sebagai platform informasi \ndan edukasi tentang SMAN 2 Kuningan.😎",
                    },
                    {
                        backgroundColor: tema.colors.background,
                        image: (
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: 100,
                                    width: 200,
                                }}
                                source={APP_LOGO}
                            />
                        ),
                        title: "Home -- Artikel -- Setting",
                        subtitle: "Kalian bisa mengakses bagan-bagan berikut ini di Smanda App.😁",
                    },
                ]}
            />
        </SafeAreaView>
    );
}
