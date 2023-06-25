import { View } from "react-native";
import { RootScreenProps } from "../../types/RootType";
import { Text, Button, useTheme } from "react-native-paper";
// import { LinearGradient } from "expo-linear-gradient";

export function HomeScreen(props: RootScreenProps) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Beranda!</Text>
            <Button
                mode="contained-tonal"
                onPress={() =>
                    props.navigation.navigate("(tabs)", {
                        screen: "Information",
                    })
                }>
                Go to Information
            </Button>
            <Text>Welcome Screen</Text>
            <Button mode="contained-tonal" onPress={() => props.navigation.navigate("GetStarted")}>
                Go to GetStarted
            </Button>
        </View>
    );
}