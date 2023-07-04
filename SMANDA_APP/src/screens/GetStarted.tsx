import { Image, StyleSheet, View } from "react-native";
import { RootScreenProps } from "../types/RootType";
import { Text, Button, Headline } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DefaultView from "../components/DefaultContainerView";
import { useGlobals } from "../context/RootContext";

export function GetStarted(props: RootScreenProps) {
    // const tema = useTheme();
    // const nav = useNavigation<typeUseNavigation>();
    const { state } = useGlobals();
    return (
        <DefaultView keyboardAvoidView={false}>
            <View style={{ flex: 0.3 }} />
            <View style={[styles.textContainer]}>
                <Text variant="headlineLarge" style={[styles.textHeadline]}>
                    Selamat datang!
                </Text>
                <Text style={styles.textText}>Di SMANDA APP, ini adalah platform informasi dan edukasi tentang SMAN 2 Kuningan.😎</Text>
            </View>
            <View style={{ flex: 2 }}>
                <Image
                    style={{
                        resizeMode: "contain",
                        height: 300,
                        width: 600,
                        alignSelf: "center",
                    }}
                    source={require("../../assets/Profile_Logo_SMANDA_APP.png")}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={{ borderRadius: 15 }}
                    contentStyle={{ height: 50 }}
                    labelStyle={{ fontSize: 15 }}
                    mode={state.isTransparent ? "contained-tonal" : "contained"}
                    // uppercase={true}
                    onPress={() => props.navigation.replace("Welcome")}>
                    Get Started
                    {/* <Text variant="titleMedium" style={{ color: tema.colors.onPrimary }}>
                        Get Started
                    </Text> */}
                </Button>
            </View>
        </DefaultView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    constellation: {
        zIndex: 0,
        position: "absolute",
        bottom: 20,
        left: 20,
        opacity: 0.1,
    },
    aquarius: {
        zIndex: 0,
        position: "absolute",
        top: 20,
        right: 20,
        opacity: 0.2,
    },
    textContainer: {
        flex: 1.3,
        alignSelf: "center",
        paddingHorizontal: 20,
    },
    textHeadline: {
        textAlign: "center",
        textTransform: "uppercase",
        // fontWeight: "bold",
        fontSize: 26,
        lineHeight: 32,
        marginVertical: 2,
        letterSpacing: 0,
    },
    textText: {
        textAlign: "center",
        paddingVertical: 5,
    },
    logoContainer: {
        flex: 1,
        alignSelf: "center",
        paddingVertical: 40,
        zIndex: 1,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 35,
        justifyContent: "flex-end",
        marginBottom: 25,
    },
});
