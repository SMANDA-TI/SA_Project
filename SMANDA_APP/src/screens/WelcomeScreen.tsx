import Onboarding from "react-native-onboarding-swiper";
import { Image, View } from "react-native";
import { RootScreenProps } from "../types/RootType";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";

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
export function WelcomeScreen(propsnav: RootScreenProps) {
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
                    style={{ borderRadius: 10 }}
                    onPress={() => {
                        onboardingRef.current.goToPage(currentPage - 1, true);
                    }}>
                    PREVIOUS
                </Button>
            )) ||
            (currentPage == 0 && <SkipButton />)
        );
    }
    function SkipButton({ ...props }) {
        return (
            <Button
                icon={({ size, color }) => <MaterialCommunityIcons name="chevron-right" size={22} color={color} />}
                contentStyle={{ flexDirection: "row-reverse" }}
                mode="text"
                style={{ borderRadius: 10 }}
                {...props}
                onPress={() => {
                    propsnav.navigation.replace("(tabs)");
                }}>
                SKIP
            </Button>
        );
    }
    return (
        <Onboarding
            ref={onboardingRef}
            DotComponent={Square}
            onDone={() => propsnav.navigation.replace("(tabs)")}
            // onSkip={() => props.navigation.replace("(tabs)")}
            SkipButtonComponent={PrevButton}
            NextButtonComponent={NextButton}
            DoneButtonComponent={DoneButton}
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
                    backgroundColor: "#000000",
                    image: (
                        <Image
                            style={{
                                resizeMode: "contain",
                                height: 100,
                                width: 200,
                            }}
                            source={require("../../assets/Profile_Logo_SMANDA_APP.png")}
                        />
                    ),
                    title: "Assalamualikum 👋",
                    subtitle: "Selamat Datang di Aplikasi Mobile SMAN 2 Kuningan. ✨",
                },
                {
                    backgroundColor: "#000000",
                    image: (
                        <Image
                            style={{
                                resizeMode: "contain",
                                height: 100,
                                width: 200,
                            }}
                            source={require("../../assets/Profile_Logo_SMANDA_APP.png")}
                        />
                    ),
                    title: "Smanda App",
                    subtitle: "Aplikasi ini bertujuan sebagai platform informasi \ndan edukasi tentang SMAN 2 Kuningan.😎",
                },
                {
                    backgroundColor: "#000000",
                    image: (
                        <Image
                            style={{
                                resizeMode: "contain",
                                height: 100,
                                width: 200,
                            }}
                            source={require("../../assets/Profile_Logo_SMANDA_APP.png")}
                        />
                    ),
                    title: "Home -- Artikel -- Setting",
                    subtitle: "Kalian bisa meng-akses bagan-bagan berikut ini di Smanda App.😁",
                },
            ]}
        />
    );
}

function DoneButton({ ...props }) {
    return (
        <Button
            {...props}
            icon={({ size, color }) => <MaterialCommunityIcons name="check-all" size={22} color={color} />}
            contentStyle={{ flexDirection: "row-reverse" }}
            mode="text"
            style={{ borderRadius: 10 }}>
            DONE
        </Button>
    );
}
function NextButton({ ...props }) {
    return (
        <Button
            icon={({ size, color }) => <MaterialCommunityIcons name="chevron-right" size={22} color={color} />}
            contentStyle={{ flexDirection: "row-reverse" }}
            mode="text"
            style={{ borderRadius: 10 }}
            {...props}>
            NEXT
        </Button>
    );
}

function Square({ isLight, selected }) {
    let backgroundColor;
    if (isLight) {
        backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
    } else {
        backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
    }
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
