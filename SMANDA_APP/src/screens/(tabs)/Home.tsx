import { View } from "react-native";
import { RootScreenProps } from "../../types/RootType";
import { Text, Button, useTheme } from "react-native-paper";
// import { LinearGradient } from "expo-linear-gradient";

export function HomeScreen(props: RootScreenProps) {
    const theme = useTheme();
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
            <Button mode="contained-tonal" onPress={() => props.navigation.navigate("Welcome")}>
                Preview to Welcome
            </Button>
        </View>
    );
}
