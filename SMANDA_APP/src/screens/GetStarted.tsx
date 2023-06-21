import Onboarding from "react-native-onboarding-swiper";
import { Image } from "react-native";
import { StackScreenProps } from "../types/NavigationType";

export function GetStarted(props: StackScreenProps) {
    // const nav = useNavigation();
    return (
        <Onboarding
            onDone={() => props.navigation.push("Home")}
            onSkip={() => props.navigation.push("Home")}
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
                    backgroundColor: "#35b41b",
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
                    backgroundColor: "#0000ff",
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
