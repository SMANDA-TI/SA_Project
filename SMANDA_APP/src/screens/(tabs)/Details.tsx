import { View, Text, Button } from "react-native";
import { RootStackScreen, RootScreenProps, typeUseNavigation } from "../../types/NavigationType";
import { useNavigation } from "@react-navigation/native";

export function DetailsScreen() {
    const nav = useNavigation<typeUseNavigation>();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Details Screen</Text>
            <Button title="Go to Welcome" onPress={() => nav.navigate("Welcome")}></Button>
        </View>
    );
}
